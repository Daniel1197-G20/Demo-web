export const MOCK_PRODUCTS = [
  // ──────────────────────────────────────────
  // 1. ARTISANAL CAKES
  // ──────────────────────────────────────────
  {
    id: 'treat-1',
    slug: 'signature-strawberry-cloud-cake',
    name: 'Signature Strawberry Cloud Cake',
    category: 'Artisanal Cakes',
    price: 18500,
    images: [
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000&auto=format&fit=crop&q=80',
    ],
    description:
      'Three airy sponge layers soaked in organic strawberry reduction, filled with whipped French mascarpone buttercream, and topped with fresh mountain strawberries and 24k edible gold leaf.',
    tastingNotes: 'Light, floral vanilla notes balanced with vibrant berry acidity and silky cream cheese richness.',
    ingredients: 'Unbleached wheat flour, European creamery butter, organic strawberries, mascarpone, Madagascar vanilla bean, farm eggs, pure cane sugar.',
    servings: 'Serves 10 - 12 guests (8-inch triple tier)',
    storage: 'Keep refrigerated between 2°C - 5°C. Best enjoyed within 48 hours of dispatch.',
    allergens: 'Contains dairy, wheat (gluten), eggs. Baked in a kitchen handling tree nuts.',
    is_available: true,
    is_featured: true,
    badge: "Chef's Signature",
    min_order_quantity: 1,
    rating: 4.9,
    reviewsCount: 42,
  },
  {
    id: 'treat-2',
    slug: 'dark-chocolate-hazelnut-fudge-cake',
    name: 'Dark Belgian Chocolate & Hazelnut Cake',
    category: 'Artisanal Cakes',
    price: 22000,
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1000&auto=format&fit=crop&q=80',
    ],
    description:
      'Rich 70% dark Belgian chocolate sponge filled with Piedmont roasted hazelnut praline ganache, finished with dark chocolate mirror glaze and crushed gold-dusted feuilletine.',
    tastingNotes: 'Decadent, deep cocoa intensity with crunchy caramelized hazelnut praline texture.',
    ingredients: '70% Callebaut dark chocolate, French butter, Piedmont hazelnuts, double cream, cocoa butter, vanilla extract.',
    servings: 'Serves 12 - 14 guests (8-inch triple tier)',
    storage: 'Keep chilled. Bring to room temperature 20 minutes before serving.',
    allergens: 'Contains dairy, wheat, tree nuts (hazelnut), eggs.',
    is_available: true,
    is_featured: true,
    badge: 'Popular',
    min_order_quantity: 1,
    rating: 5.0,
    reviewsCount: 38,
  },
  {
    id: 'treat-3',
    slug: 'pistachio-rose-water-layer-cake',
    name: 'Sicilian Pistachio & Persian Rose Cake',
    category: 'Artisanal Cakes',
    price: 24500,
    images: [
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1000&auto=format&fit=crop&q=80',
    ],
    description:
      'Delicate Sicilian pistachio sponge layered with rose-scented white chocolate mousse, crushed candied pistachios, and dried edible organic rose petals.',
    tastingNotes: 'Earthy nutty pistachio accented by subtle floral rosewater and smooth white chocolate.',
    ingredients: 'Sicilian pistachio flour, pure rosewater, French butter, white chocolate, organic eggs, cane sugar.',
    servings: 'Serves 10 - 12 guests',
    storage: 'Refrigerate upon delivery. Serve slightly chilled.',
    allergens: 'Contains tree nuts (pistachio), dairy, wheat, eggs.',
    is_available: true,
    is_featured: false,
    badge: 'Artisanal Special',
    min_order_quantity: 1,
    rating: 4.8,
    reviewsCount: 19,
  },
  {
    id: 'treat-4',
    slug: 'salted-caramel-biscoff-drip-cake',
    name: 'Salted Caramel Lotus Biscoff Drip Cake',
    category: 'Artisanal Cakes',
    price: 21000,
    images: [
      'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000&auto=format&fit=crop&q=80',
    ],
    description:
      'Warm-spiced brown sugar sponge filled with crunchy Lotus Biscoff spread, drizzled with homemade Maldon sea salt caramel, and topped with Biscoff cookie crumble.',
    tastingNotes: 'Caramelized speculoos spice complemented by rich buttery salted caramel.',
    ingredients: 'Biscoff spread & cookies, Maldon sea salt, creamery butter, dark brown sugar, Madagascar vanilla.',
    servings: 'Serves 10 - 12 guests',
    storage: 'Keep refrigerated; store in an airtight container once sliced.',
    allergens: 'Contains dairy, wheat, soy, eggs.',
    is_available: true,
    is_featured: false,
    badge: 'Bestseller',
    min_order_quantity: 1,
    rating: 4.9,
    reviewsCount: 29,
  },

  // ──────────────────────────────────────────
  // 2. GOURMET CUPCAKES
  // ──────────────────────────────────────────
  {
    id: 'treat-5',
    slug: 'red-velvet-gold-cupcakes-box-of-6',
    name: 'Red Velvet 24k Gold Cupcakes (Box of 6)',
    category: 'Gourmet Cupcakes',
    price: 9500,
    images: [
      'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=1000&auto=format&fit=crop&q=80',
    ],
    description:
      'Moist cocoa-infused velvet sponge crowned with our signature whipped Swiss cream cheese frosting and hand-applied 24k edible gold flakes.',
    tastingNotes: 'Velvety cocoa crumb with a silky, tangy-sweet cream cheese finish.',
    ingredients: 'Buttermilk, Dutch cocoa powder, cream cheese, French butter, powdered sugar, 24k edible gold.',
    servings: 'Box of 6 individual gourmet cupcakes',
    storage: 'Keep chilled. Best enjoyed within 3 days.',
    allergens: 'Contains dairy, wheat, eggs.',
    is_available: true,
    is_featured: true,
    badge: 'Boutique Box',
    min_order_quantity: 1,
    rating: 4.9,
    reviewsCount: 56,
  },
  {
    id: 'treat-6',
    slug: 'salted-caramel-vanilla-cupcakes-box-of-6',
    name: 'Salted Caramel Vanilla Cupcakes (Box of 6)',
    category: 'Gourmet Cupcakes',
    price: 9000,
    images: [
      'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=1000&auto=format&fit=crop&q=80',
    ],
    description:
      'Madagascar vanilla bean sponge filled with a molten salted caramel core, topped with whipped buttercream and caramel swirl drizzle.',
    tastingNotes: 'Buttery sweet vanilla with a surprise gooey, salted caramel molten center.',
    ingredients: 'Bourbon vanilla beans, heavy cream, European butter, sea salt, cane sugar.',
    servings: 'Box of 6 gourmet cupcakes',
    storage: 'Store in a cool dry place or refrigerated.',
    allergens: 'Contains dairy, wheat, eggs.',
    is_available: true,
    is_featured: false,
    badge: null,
    min_order_quantity: 1,
    rating: 4.8,
    reviewsCount: 22,
  },
  {
    id: 'treat-7',
    slug: 'double-belgian-chocolate-truffle-cupcakes',
    name: 'Double Belgian Chocolate Cupcakes (Box of 6)',
    category: 'Gourmet Cupcakes',
    price: 9500,
    images: [
      'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=1000&auto=format&fit=crop&q=80',
    ],
    description:
      'Dark chocolate fudge sponge piped with whipped Belgian chocolate ganache and finished with a dark chocolate hazelnut truffle.',
    tastingNotes: 'Deep, bittersweet cocoa notes with velvety melt-in-the-mouth ganache.',
    ingredients: 'Callebaut chocolate, Dutch cocoa, double cream, unsalted butter, eggs.',
    servings: 'Box of 6 gourmet cupcakes',
    storage: 'Refrigerate and serve at room temperature.',
    allergens: 'Contains dairy, wheat, eggs, trace nuts.',
    is_available: true,
    is_featured: false,
    badge: null,
    min_order_quantity: 1,
    rating: 4.9,
    reviewsCount: 31,
  },

  // ──────────────────────────────────────────
  // 3. FRESH PASTRIES & VIENNOISERIE
  // ──────────────────────────────────────────
  {
    id: 'treat-8',
    slug: 'pistachio-butter-croissants-box-of-4',
    name: 'Pistachio Butter Croissants (4 pcs)',
    category: 'Fresh Pastries',
    price: 8000,
    images: [
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&auto=format&fit=crop&q=80',
    ],
    description:
      '72-hour laminated French butter pastry filled with Sicilian roasted pistachio praline and topped with toasted flaked pistachios.',
    tastingNotes: 'Crisp shatteringly flaky honeycomb crust with luscious nutty pistachio filling.',
    ingredients: 'Normandy butter (84% fat), T55 French flour, Sicilian pistachio paste, milk, yeast, sea salt.',
    servings: 'Box of 4 freshly baked croissants',
    storage: 'Best consumed fresh on day of delivery. Warm in oven at 160°C for 3 minutes for ultimate flakiness.',
    allergens: 'Contains dairy, wheat, tree nuts (pistachio).',
    is_available: true,
    is_featured: true,
    badge: 'Morning Fresh',
    min_order_quantity: 1,
    rating: 5.0,
    reviewsCount: 64,
  },
  {
    id: 'treat-9',
    slug: 'pain-au-chocolat-box-of-4',
    name: 'Classic French Pain au Chocolat (4 pcs)',
    category: 'Fresh Pastries',
    price: 7500,
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1000&auto=format&fit=crop&q=80',
    ],
    description:
      'Golden layered buttery puff pastry enclosing twin batons of bittersweet 60% French baking chocolate.',
    tastingNotes: 'Crisp buttery pastry giving way to soft rich dark chocolate pockets.',
    ingredients: 'French pastry flour, Normandy butter, Valrhona dark chocolate batons, milk, whole eggs.',
    servings: 'Box of 4 pastries',
    storage: 'Warm gently before enjoying with coffee.',
    allergens: 'Contains dairy, wheat, eggs, soy lecithin.',
    is_available: true,
    is_featured: false,
    badge: null,
    min_order_quantity: 1,
    rating: 4.8,
    reviewsCount: 45,
  },
  {
    id: 'treat-10',
    slug: 'salted-caramel-choux-eclairs-box-of-4',
    name: 'Bourbon Vanilla & Caramel Éclairs (4 pcs)',
    category: 'Fresh Pastries',
    price: 7500,
    images: [
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&auto=format&fit=crop&q=80',
    ],
    description:
      'Crisp baked choux pastry shells filled with silky Bourbon vanilla bean crème diplomate and glazed with fleur de sel caramel.',
    tastingNotes: 'Crisp light pastry with cloud-like vanilla cream and glossy amber caramel.',
    ingredients: 'Choux paste, Bourbon vanilla pods, egg yolks, whole milk, cream, Maldon sea salt caramel.',
    servings: 'Box of 4 luxury éclairs',
    storage: 'Keep strictly chilled. Consume within 24 hours for best pastry texture.',
    allergens: 'Contains dairy, wheat, eggs.',
    is_available: true,
    is_featured: false,
    badge: null,
    min_order_quantity: 1,
    rating: 4.9,
    reviewsCount: 27,
  },

  // ──────────────────────────────────────────
  // 4. DESSERT CUPS & PARFAITS
  // ──────────────────────────────────────────
  {
    id: 'treat-11',
    slug: 'mango-passionfruit-parfait-cups',
    name: 'Mango & Passionfruit Parfait Cups (6 pcs)',
    category: 'Dessert Cups',
    price: 12000,
    images: [
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1000&auto=format&fit=crop&q=80',
    ],
    description:
      'Individual presentation glass cups layered with ripe Alfonso mango coulis, vanilla bean mascarpone mousse, passionfruit curd, and buttery almond crumble.',
    tastingNotes: 'Tropical vibrant citrus tang balanced by luscious mascarpone creaminess and crunchy butter crumble.',
    ingredients: 'Alfonso mango pulp, passionfruit, mascarpone, double cream, almond flour, pure vanilla.',
    servings: 'Set of 6 dessert glasses with tasting spoons',
    storage: 'Keep chilled. Ready to serve immediately.',
    allergens: 'Contains dairy, tree nuts (almond).',
    is_available: true,
    is_featured: true,
    badge: 'Party Favorite',
    min_order_quantity: 1,
    rating: 4.9,
    reviewsCount: 36,
  },
  {
    id: 'treat-12',
    slug: 'tiramisu-mascarpone-dessert-shooters',
    name: 'Espresso & Mascarpone Tiramisu (6 pcs)',
    category: 'Dessert Cups',
    price: 13500,
    images: [
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1000&auto=format&fit=crop&q=80',
    ],
    description:
      'Authentic Italian savoiardi sponge soaked in single-origin Lagos espresso, layered with whipped zabaglione mascarpone and dusted with Dutch cocoa.',
    tastingNotes: 'Bold espresso punch enveloped in velvety, airy mascarpone mousse.',
    ingredients: 'Ladyfinger biscuits, single-origin espresso, mascarpone, pasteurized eggs, cocoa powder.',
    servings: 'Set of 6 individual shooter cups',
    storage: 'Keep refrigerated between 2°C - 5°C.',
    allergens: 'Contains dairy, wheat, eggs.',
    is_available: true,
    is_featured: false,
    badge: null,
    min_order_quantity: 1,
    rating: 5.0,
    reviewsCount: 24,
  },

  // ──────────────────────────────────────────
  // 5. CELEBRATION PLATTERS & HAMPERS
  // ──────────────────────────────────────────
  {
    id: 'treat-13',
    slug: 'grand-artisanal-dessert-platter',
    name: 'The Grand Celebration Platter (24 pcs)',
    category: 'Celebration Platters',
    price: 38000,
    images: [
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1000&auto=format&fit=crop&q=80',
    ],
    description:
      'A showstopping curated centerpiece box containing 6 mini gold cupcakes, 6 French macarons, 6 mini fruit éclairs, and 6 dark chocolate truffles in luxury presentation packaging.',
    tastingNotes: 'A multi-texture symphony of crisp macarons, velvety cupcakes, choux pastries, and chocolate truffles.',
    ingredients: 'Assorted premium patisserie ingredients, French butter, chocolate, berries, pistachios, gold leaf.',
    servings: 'Serves 15 - 25 guests for cocktails & celebrations',
    storage: 'Keep in cool room or chilled until party presentation.',
    allergens: 'Contains dairy, wheat, tree nuts, eggs, soy.',
    is_available: true,
    is_featured: true,
    badge: 'Luxury Event Selection',
    min_order_quantity: 1,
    rating: 5.0,
    reviewsCount: 52,
  },
  {
    id: 'treat-14',
    slug: 'luxury-afternoon-tea-pastry-hamper',
    name: 'Luxury Afternoon Tea Hamper',
    category: 'Celebration Platters',
    price: 28500,
    images: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=1000&auto=format&fit=crop&q=80',
    ],
    description:
      'Artisanal English butter scones with strawberry reserve and clotted cream, 4 mini pain au chocolat, 4 pistachio croissants, and artisanal floral tea canisters in a bespoke ribbon-tied box.',
    tastingNotes: 'Traditional high-tea warmth with freshly baked scones and flaked French viennoiserie.',
    ingredients: 'Clotted cream, artisanal berry jam, French butter, flour, organic dried florals.',
    servings: 'Ideal for 4 - 6 guests / luxury gifting',
    storage: 'Serve day of delivery; scone re-heating guide included.',
    allergens: 'Contains dairy, wheat, tree nuts, eggs.',
    is_available: true,
    is_featured: false,
    badge: 'Gift Choice',
    min_order_quantity: 1,
    rating: 4.9,
    reviewsCount: 18,
  },
];

export const CATEGORIES_LIST = [
  'All',
  'Artisanal Cakes',
  'Gourmet Cupcakes',
  'Fresh Pastries',
  'Dessert Cups',
  'Celebration Platters',
];

export function getProductBySlug(slug) {
  return MOCK_PRODUCTS.find((p) => p.slug === slug || p.id === slug) || MOCK_PRODUCTS[0];
}

export function getRelatedProducts(currentSlug, limit = 3) {
  const current = getProductBySlug(currentSlug);
  return MOCK_PRODUCTS.filter((p) => p.id !== current.id)
    .sort((a, b) => (a.category === current.category ? -1 : 1))
    .slice(0, limit);
}
