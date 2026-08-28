import { useState, useCallback, useRef } from 'react';
import { useToast } from './useToast';

/**
 * Hook to manage optimistic UI updates with snapshot rollback on error.
 *
 * Flow:
 * Current State
 *      ↓
 * User Action
 *      ↓
 * Optimistic UI Update (Immediate)
 *      ↓
 * Background Operation
 *      ↓
 * Success → Commit state & keep update
 * Failure → Restore previous state snapshot + Toast error
 *
 * @param {any} initialValue - Initial state value
 * @param {Object} options - Global options for optimistic mutations
 * @returns {Object} Optimistic state controls
 */
export function useOptimisticState(initialValue, options = {}) {
  const [state, setState] = useState(initialValue);
  const [isPending, setIsPending] = useState(false);
  const [isOptimistic, setIsOptimistic] = useState(false);
  const [error, setError] = useState(null);

  const snapshotRef = useRef(initialValue);
  const toast = useToast();

  const {
    showToastOnError = true,
    defaultErrorMessage = 'Action could not be completed. Changes reverted.',
  } = options;

  /**
   * Perform an optimistic update
   *
   * @param {any|Function} optimisticValue - Next state or updater function (prevState => nextState)
   * @param {Function} asyncAction - Async action to execute (e.g. store update / API call)
   * @param {Object} actionOptions - Per-action callbacks and custom messages
   */
  const updateOptimistic = useCallback(
    async (optimisticValue, asyncAction, actionOptions = {}) => {
      const {
        onSuccess,
        onError,
        onRollback,
        successMessage,
        errorMessage = defaultErrorMessage,
        simulateFailure = false, // for testing rollback capabilities safely
      } = actionOptions;

      // 1. Take snapshot of current state
      const previousSnapshot = state;
      snapshotRef.current = previousSnapshot;

      // 2. Compute and apply optimistic state immediately
      const nextState =
        typeof optimisticValue === 'function'
          ? optimisticValue(previousSnapshot)
          : optimisticValue;

      setState(nextState);
      setIsOptimistic(true);
      setIsPending(true);
      setError(null);

      try {
        if (simulateFailure) {
          throw new Error('Simulated failure for optimistic rollback testing');
        }

        // 3. Run background operation
        let result = nextState;
        if (typeof asyncAction === 'function') {
          result = await Promise.resolve(asyncAction(nextState, previousSnapshot));
        }

        // 4. Success -> commit state
        setIsOptimistic(false);
        setIsPending(false);

        if (successMessage && toast) {
          toast.success(successMessage);
        }

        if (onSuccess) {
          onSuccess(result, nextState);
        }

        return result;
      } catch (err) {
        // 5. Failure -> Rollback to snapshot
        console.warn('Optimistic action failed, rolling back:', err);
        setState(previousSnapshot);
        setIsOptimistic(false);
        setIsPending(false);
        setError(err);

        if (showToastOnError && toast) {
          toast.error(errorMessage, 'Update Reverted');
        }

        if (onRollback) {
          onRollback(previousSnapshot, err);
        }

        if (onError) {
          onError(err, previousSnapshot);
        }

        throw err;
      }
    },
    [state, defaultErrorMessage, showToastOnError, toast]
  );

  /**
   * Manually revert to the previous snapshot
   */
  const rollback = useCallback(() => {
    setState(snapshotRef.current);
    setIsOptimistic(false);
    setIsPending(false);
  }, []);

  /**
   * Manually commit a specific value
   */
  const commit = useCallback((value) => {
    setState(value);
    snapshotRef.current = value;
    setIsOptimistic(false);
    setIsPending(false);
  }, []);

  return {
    state,
    setState,
    isPending,
    isOptimistic,
    error,
    updateOptimistic,
    rollback,
    commit,
  };
}

export default useOptimisticState;
