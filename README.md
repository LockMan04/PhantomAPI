# Random Placeholder API

A blazing fast, robust, and completely stateless API for generating random fake data and highly customizable SVG image placeholders. Built specifically to help developers quickly mock up frontend interfaces without dealing with databases or external dependencies.

## 🚀 Features

- **Random Data Generation**: Instantly generate realistic-looking data (users, addresses, orders, products, etc.) using `@faker-js/faker`.
- **SVG Image Placeholders**: Ultra-fast SVG placeholder generator. No heavy image processing—just pure, scalable vector graphics.
- **Multi-locale Support**: Generate data in English (`en`) or Vietnamese (`vi`).
- **Reproducible Data**: Use the `seed` parameter to get consistent fake data on every request.
- **Interactive Playground**: Comes with a beautiful dashboard (built with Next.js 15, Tailwind CSS, and shadcn/ui) to test API endpoints directly.
- **Documentation Built-in**: Easy-to-read docs seamlessly integrated using a custom Sidebar layout.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui (Radix Primitives)
- **Data Generator**: `@faker-js/faker`

## 📦 Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd random-placeholder-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to see the Documentation and API Playground.

## 📡 API Reference

### Random Data Endpoints

All random data endpoints are accessible under `/api/random/`.

**Base URL**: `GET /api/random/[resource]`

**Available Resources:**
- `person`, `address`, `phone`, `company`, `product`, `user`, `post`, `order`, `finance`, `date`, `internet`, `lorem`, `animal`, `hacker`
- `all` (returns a dictionary containing all resources)

**Query Parameters:**
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `limit` | number | `1` | Number of items to generate (1 - 50) |
| `locale` | string | `en` | Language locale (`en` or `vi`) |
| `seed` | string | `undefined`| Seed string for reproducible data |

**Example Request:**
```bash
curl "http://localhost:3000/api/random/person?limit=2&locale=vi"
```

### Placeholder Images Endpoints

All placeholder image endpoints are accessible under `/api/placeholder/`. They return SVG images natively for maximum performance.

**Endpoints:**
- `GET /api/placeholder/image`
- `GET /api/placeholder/avatar`

**Query Parameters:**
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `width` | number | `400` (image), `200` (avatar) | Image width in pixels |
| `height` | number | `300` (image), `200` (avatar) | Image height in pixels |
| `bgColor` | string | `ccc` | Background hex color (without `#`) |
| `textColor` | string | `000` | Text hex color (without `#`) |
| `text` | string | Dimensions or `AV` | Custom text to render inside the SVG |

**Example Request:**
```bash
curl "http://localhost:3000/api/placeholder/avatar?width=150&height=150&bgColor=ff0000&textColor=ffffff&text=JS"
```

## 📜 Response Format

All random data endpoints return JSON in the following uniform structure:

**Success Response:**
```json
{
  "success": true,
  "data": { ... } // or array if limit > 1
  "meta": {
    "fake": true,
    "forTestingOnly": true,
    "locale": "en",
    "seed": false,
    "generatedAt": "2024-04-07T12:00:00.000Z"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMS",
    "message": "Limit must be a number between 1 and 50"
  }
}
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the API or UI.
