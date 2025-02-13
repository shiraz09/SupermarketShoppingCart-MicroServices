# 🛒 Supermarket Shopping Cart Microservices

Welcome to the **Supermarket Shopping Cart Microservices** project! This system is designed to handle various e-commerce operations using a modular microservices architecture. Built with Docker, it offers easy setup and deployment for both backend and frontend components.

---

## 🌟 Features

- Microservices for core shopping cart operations
- Frontend React application
- Seamless integration using Docker Compose
- Modular, scalable, and ready for production

---

## 📜 Table of Contents

- [🛠️ Prerequisites](#️-prerequisites)
- [📦 Project Structure](#-project-structure)
- [🚀 How to Run](#-how-to-run)
- [📁 Services Overview](#-services-overview)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Node.js Services](#nodejs-services)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- 🐋 [Docker](https://www.docker.com/) (v20+)
- 🐳 [Docker Compose](https://docs.docker.com/compose/) (v2+)

---

## 📦 Project Structure

```plaintext
shiraz09-supermarketshoppingcart-microservices/
├── docker-compose.yml       # Main Docker Compose file
├── seed_data.py             # Script to seed initial data
├── backend/                 # Backend microservices
│   ├── add_product/         # Add product to cart
│   ├── checkout/            # Checkout service
│   ├── delete_product/      # Delete product from cart
│   ├── ...                  # Other backend services
├── frontend/                # React-based frontend
├── nodejs-services/         # Additional services in Node.js
```

---

## 🚀 How to Run

This project is fully containerized. Follow these steps to run it:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/shiraz09-supermarketshoppingcart-microservices.git
   cd shiraz09-supermarketshoppingcart-microservices
   ```

2. **Build and start services with Docker Compose**:

   ```bash
   docker-compose up --build
   ```

3. **Access the application**:

   - Frontend: Open [http://localhost:3000](http://localhost:3000) in your browser.
   - Backend services: Available on ports specified in `docker-compose.yml`.

---

## 📁 Services Overview

### Backend

The backend consists of multiple Python-based microservices, each with a specific responsibility. These services are built using Flask and follow a RESTful design.

#### Services:

- **add_product**: Add products to the cart.
- **delete_product**: Remove products from the cart.
- **checkout**: Handle the checkout process.
- **get_cart**: Retrieve the user's cart.
- **get_products**: Fetch available products.
- **reset_cart**: Clear the cart.

### Frontend

The frontend is a React application providing a user-friendly interface to interact with the shopping cart system. It includes pages for:

- Viewing and searching products
- Adding/removing items to/from the cart
- Checking out

### Node.js Services

Some additional services are implemented using Node.js for specialized tasks.

#### Services:

- **add_product**: Node.js version of adding products to the cart.
- **delete_product**: Node.js version of deleting products from the cart.

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

💡 **Tip**: Make sure Docker is running before starting the services!
