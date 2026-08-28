import React, { useState, useRef, useEffect, useId, cloneElement, isValidElement } from 'react';
import { HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Global Accessible Tooltip Component for Tory's Treats
 * 
 * Features:
 * - Brand-aligned luxury styling (Charcoal + Tory Pink + White)
 * - Desktop: Hover with 150ms delay & keyboard focus visibility
 * - Mobile: Accessible tap/touch support with outside-click dismissal
 * - Viewport collision prevention: Clamps within screen edges (320px - 1920px)
 * - ARIA accessibility: role="tooltip", aria-describedby linkage, Escape key closing
 * - Motion: Respects prefers-reduced-motion
 */
export function Tooltip({
  children,
  content,
  position = 'top', // 'top' | 'bottom' | 'left' | 'right'
  delay = 150,
  disabled = false,
  variant = 'dark', // 'dark' | 'brand' | 'light'
  className = '',
  maxWidth = 'max-w-xs',
  arrow = true,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, actualPosition: position });
  const timeoutRef = useRef(null);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const id = useId();

  // If no content is provided or disabled, render children directly
  if (!content || disabled) {
    return <>{children}</>;
  }

  // Calculate position with viewport boundary clamping
  const updatePosition = () => {
    if (!triggerRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset || 0;
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let targetPos = position;
    const gap = 8;

    // Estimate tooltip dimensions or use measured dimensions if rendered
    const tipWidth = tooltipRef.current ? tooltipRef.current.offsetWidth : 160;
    const tipHeight = tooltipRef.current ? tooltipRef.current.offsetHeight : 32;

    // Flip position if not enough room on top/bottom
    if (targetPos === 'top' && triggerRect.top - tipHeight - gap < 8) {
      targetPos = 'bottom';
    } else if (targetPos === 'bottom' && triggerRect.bottom + tipHeight + gap > viewportHeight - 8) {
      targetPos = 'top';
    }

    let top = 0;
    let left = 0;

    if (targetPos === 'top') {
      top = triggerRect.top + scrollY - tipHeight - gap;
      left = triggerRect.left + scrollX + triggerRect.width / 2 - tipWidth / 2;
    } else if (targetPos === 'bottom') {
      top = triggerRect.bottom + scrollY + gap;
      left = triggerRect.left + scrollX + triggerRect.width / 2 - tipWidth / 2;
    } else if (targetPos === 'left') {
      top = triggerRect.top + scrollY + triggerRect.height / 2 - tipHeight / 2;
      left = triggerRect.left + scrollX - tipWidth - gap;
    } else if (targetPos === 'right') {
      top = triggerRect.top + scrollY + triggerRect.height / 2 - tipHeight / 2;
      left = triggerRect.right + scrollX + gap;
    }

    // Viewport clamping (prevent overflowing off horizontal screen edges, especially on 320px/375px mobile)
    const padding = 10;
    const minLeft = scrollX + padding;
    const maxLeft = scrollX + viewportWidth - tipWidth - padding;
    left = Math.max(minLeft, Math.min(left, maxLeft));

    setCoords({ top, left, actualPosition: targetPos });
  };

  const show = () => {
    if (disabled) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      requestAnimationFrame(updatePosition);
    }, delay);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const toggleMobile = (e) => {
    // If it's a touch or click event, allow toggle on mobile
    if (window.matchMedia('(hover: none)').matches || 'ontouchstart' in window) {
      if (!isVisible) {
        show();
      } else {
        hide();
      }
    }
  };

  // Keyboard and outside click handlers
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        hide();
      }
    };

    const handleOutsideClick = (e) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target)
      ) {
        hide();
      }
    };

    const handleScrollOrResize = () => {
      updatePosition();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handleOutsideClick);
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handleOutsideClick);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isVisible]);

  // Styling variants
  const variantStyles = {
    dark: 'bg-[#2B2024] text-white border border-[#E82C7C]/40 shadow-[0_8px_20px_rgba(43,32,36,0.3)]',
    brand: 'bg-[#E82C7C] text-white border border-[#C92163] shadow-[0_8px_20px_rgba(232,44,124,0.3)]',
    light: 'bg-white text-[#2B2024] border border-[#F0D9E1] shadow-[0_8px_25px_rgba(232,44,124,0.12)]',
  };

  // Clone children to attach events & ref safely
  const triggerElement = isValidElement(children) ? (
    cloneElement(children, {
      ref: (node) => {
        triggerRef.current = node;
        const { ref } = children;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      onMouseEnter: (e) => {
        show();
        children.props.onMouseEnter?.(e);
      },
      onMouseLeave: (e) => {
        hide();
        children.props.onMouseLeave?.(e);
      },
      onFocus: (e) => {
        show();
        children.props.onFocus?.(e);
      },
      onBlur: (e) => {
        hide();
        children.props.onBlur?.(e);
      },
      onClick: (e) => {
        toggleMobile(e);
        children.props.onClick?.(e);
      },
      'aria-describedby': isVisible ? id : children.props['aria-describedby'],
    })
  ) : (
    <span
      ref={triggerRef}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onClick={toggleMobile}
      aria-describedby={isVisible ? id : undefined}
      className="inline-block"
    >
      {children}
    </span>
  );

  return (
    <>
      {triggerElement}

      {isVisible && (
        <div
          ref={tooltipRef}
          id={id}
          role="tooltip"
          aria-hidden={!isVisible}
          style={{
            position: 'absolute',
            top: `${coords.top}px`,
            left: `${coords.left}px`,
          }}
          className={cn(
            'z-50 pointer-events-none select-none px-2.5 py-1.5 rounded-xl text-xs font-semibold leading-snug animate-tooltip tracking-normal',
            maxWidth,
            variantStyles[variant] || variantStyles.dark,
            className
          )}
        >
          {content}

          {/* Optional Arrow Indicator */}
          {arrow && (
            <div
              aria-hidden="true"
              className={cn(
                'absolute w-2 h-2 rotate-45 pointer-events-none',
                variant === 'brand'
                  ? 'bg-[#E82C7C]'
                  : variant === 'light'
                  ? 'bg-white border-[#F0D9E1]'
                  : 'bg-[#2B2024] border-[#E82C7C]/40',
                coords.actualPosition === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2 border-r border-b',
                coords.actualPosition === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2 border-l border-t',
                coords.actualPosition === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2 border-r border-t',
                coords.actualPosition === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2 border-l border-b'
              )}
            />
          )}
        </div>
      )}
    </>
  );
}

/**
 * Tooltip.Info: Convenience help badge with (?) icon and built-in tooltip
 */
export function TooltipInfo({
  content,
  position = 'top',
  className = '',
  iconClassName = 'w-3.5 h-3.5',
  ariaLabel = 'More information',
}) {
  return (
    <Tooltip content={content} position={position} className={className}>
      <button
        type="button"
        aria-label={ariaLabel}
        className="inline-flex items-center justify-center p-0.5 rounded-full text-[#7A6B70] hover:text-[#E82C7C] hover:bg-[#FFF5F8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E82C7C] transition-colors"
      >
        <HelpCircle className={cn('stroke-[2.2px]', iconClassName)} />
      </button>
    </Tooltip>
  );
}

Tooltip.Info = TooltipInfo;

export default Tooltip;
