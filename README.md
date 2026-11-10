# Tradly - Grocery Marketplace Mobile App

> 👨‍💻 Developed by **[Suresh Kumar Meesala](https://github.com/SureshKumarMeesala)** · 🎨 UI design by **Jk Baseer** (credits below)

A social commerce mobile application designed for farmers, artisans, and organic grocery shoppers. Built strictly with **pure JavaScript & JSX** (`.js` / `.jsx`), Expo SDK 58+, and Expo Router.

---

## 📱 Features & Screens

### 1. Onboarding & Authentication
- **Splash Screen**: Branded animated leaf emblem on Tradly Pine Green (`#33907C`).
- **3-Step Onboarding Flow**:
  1. *Empowering Artisans, Farmers & Micro Business*
  2. *Connecting NGOs, Social Enterprises with Communities*
  3. *Donate, Invest & Support Infrastructure Projects*
- **Authentication**:
  - Full tabbed interface with Login and Sign Up.
  - SMS OTP Request (+1, +91, +44, etc.) and 6-Digit OTP Verification with instant auto-fill code.
  - Social login shortcuts (Google, Apple).

### 2. Dual-Sided Social Marketplace
- **Home Dashboard (`/(tabs)/index`)**:
  - Top header with search, active wishlist counter, and cart badge.
  - "Ready to deliver to your home" promotional banner with quick CTA.
  - 8 Category circular cards (Beverages, Bread & Bakery, Vegetables, Fruit, Egg, Frozen Veg, Home Care, Pet Care).
  - "New Product" horizontal carousel with "See All".
  - "Popular Product" 2-column grid.
  - "Store to follow" horizontal scroll with real-time Follow/Following toggle.
- **Browse Catalog (`/(tabs)/browse`)**:
  - Search filter with active query highlights.
  - Sort Modal (Price Low-to-High, High-to-Low, Rating, Popularity).
  - Delivery Zone selector modal (Downtown Central, Green District, Westside Farms).
  - Category filter pills carousel.
  - 2-Column responsive product grid with live stock and discount tags.
- **Seller Store Dashboard (`/(tabs)/store`)**:
  - If user has no store: "You Don't Have a Store" artboard UI with Create Store CTA.
  - If user has a store: Full seller dashboard with Store Banner, Logo, Verified badge, Earnings ($1,420.50), Followers (1.2k), Inventory list with edit & delete actions, and shortcut to public store profile.
- **Order History & Real-Time Tracking (`/(tabs)/orders`)**:
  - Past order receipts with date, item count, total price, and status badge.
  - Interactive Tracking Modal with 5-step status timeline (Order Placed -> Payment Confirmed -> Processed -> Shipped -> Delivered).
  - One-tap "Reorder" button.
- **Profile & Account (`/(tabs)/profile`)**:
  - User avatar with "Tradly Team", email, phone number.
  - Edit Profile modal with name, phone, email updates.
  - Language & Currency selector, Refer a Friend modal, Feedback modal, and Logout.
- **Product Detail (`/product-detail?id=...`)**:
  - Hero image gallery with discount pill and organic badge.
  - Price, crossed-out original price, savings calculation.
  - Seller Store Card linking directly to seller's public store.
  - Tabbed specification sheet (Origin / Farm, Shelf Life, Storage, Reviews).
  - Sticky bottom purchase bar with +/- quantity picker, Add to Cart, and Buy Now.
- **Wishlist (`/wishlist`)**:
  - Saved products grid with quick "Add All to Cart" action.
- **Multi-Step Checkout (`/checkout`)**:
  - Step 1: My Cart (Item list, quantity steppers, promo code `TRADLYWELCOME`, subtotal & delivery fee).
  - Step 2: Delivery Address selection.
  - Step 3: Payment Options (Credit/Debit Card with visual card layout, Tradly Eco Wallet, Cash on Delivery).
  - Add / Update Card modal.
  - Checkout Success Screen with confetti checkmark, order ID, and tracking button.
- **Public Store Profile (`/store-profile?id=...`)**:
  - Seller cover banner, avatar, follower count, total products, rating, bio, and follow toggle.
  - Store catalog with category filter tabs.
- **Create Store Form (`/create-store`)**:
  - Store Name, Tagline, Category, Address, Phone, Website.
- **Add / Edit Product Form (`/add-product`)**:
  - Product Name, Category, Price, Original Price, Unit, Stock, 100% Organic toggle, Description.

---

## 🎨 Design System
- **Primary Color**: `#33907C` (Tradly Pine Green)
- **Primary Dark**: `#246D5E`
- **Primary Light**: `#E9F5F2`
- **Accent**: `#FF9800`
- **Background**: `#F8FAF9`
- **Card**: `#FFFFFF`

---

## 🚀 Running the App

```bash
npx expo start
```

<!-- run-locally:start -->

## ▶️ Run locally

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator, `a` for Android, or `w` for the web, or scan the QR code with Expo Go.

<!-- run-locally:end -->

<!-- developer:start -->

## 👨‍💻 Developer

This React Native app was developed by **Suresh Kumar Meesala**.

| | |
|---|---|
| Developer | [Suresh Kumar Meesala](https://github.com/SureshKumarMeesala) |
| GitHub | [@SureshKumarMeesala](https://github.com/SureshKumarMeesala) |
| Organization | [FreeAppSource](https://github.com/FreeAppSource) |
| Repository | <https://github.com/FreeAppSource/grocery-marketplace-app> |

<!-- developer:end -->

---

<!-- design-credits:start -->

## 🎨 Design Credits

This app is based on the free **Grocery and Marketplace App Kit** design by **Jk Baseer**, downloaded from Sketch App Sources. All visual design credit goes to the designer. It follows the design's screens, user flows and content; visual details (exact spacing, fonts, some colours and illustrations) are approximated and may differ from the original.

| | |
|---|---|
| Designer | [Jk Baseer](https://www.sketchappsources.com/contributor/jkbaseer) |
| Original design | [Grocery and Marketplace App Kit](https://tradly.app/) |
| Downloaded from | [Sketch App Sources](https://www.sketchappsources.com/free-source/4793-grocery-marketplace-app-sketch-freebie-resource.html) |
| Twitter | <https://twitter.com/jkbaseer> |
| Original file | `grocery-marketplace-tradly.app.sketch` |
| License / usage | Not stated on the source page. Free download; credit the designer (Sketch App Sources Terms) and confirm with them before commercial use. |

**Attribution:**

> UI design: "Grocery and Marketplace App Kit" by Jk Baseer (https://tradly.app/), downloaded from Sketch App Sources (https://www.sketchappsources.com/free-source/4793-grocery-marketplace-app-sketch-freebie-resource.html).

The original design source files are not included in this repository; get them from the links above. This app's **code** is released under the [MIT License](./LICENSE); the visual design remains the designer's (see [NOTICE](./NOTICE)).

Photos, brand logos and avatars inside the design may belong to third parties and are not covered by the designer's permission.

<!-- design-credits:end -->
