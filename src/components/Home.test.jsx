import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from "./Home.jsx";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from '../context/GlobalContext';

// Mock du module GlobalContext
vi.mock('../context/GlobalContext', () => ({
    useGlobalContext: () => ({
        addToCart: vi.fn(),
        cartItems: [],
        currency: 'EUR',
        isDarkMode: false,
        toggleTheme: vi.fn(),
        changeCurrency: vi.fn(),
    }),
    GlobalProvider: ({ children }) => children,
}));

// Mock de NavBar pour éviter les problèmes liés à ce composant
vi.mock('./NavBar', () => ({
    default: () => <div>Mocked NavBar</div>
}));

describe('Home', () => {
    beforeEach(() => {
        // eslint-disable-next-line no-undef
        global.fetch = vi.fn()
    })

    it('Vue homepage', async () => {
        // eslint-disable-next-line no-undef
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([
                {
                    id: 1,
                    title: 'Produit 1',
                    price: 15,
                    category: "men's clothing",
                    image: 'image1.jpg'
                },
                {
                    id: 2,
                    title: 'Produit 2',
                    price: 35,
                    category: "women's clothing",
                    image: 'image2.jpg'
                }
            ])
        });

        render(
            <BrowserRouter>
                <GlobalProvider>
                    <Home />
                </GlobalProvider>
            </BrowserRouter>
        );

        await waitFor(() => {
            const productCards = screen.getAllByTestId('product-card');
            expect(productCards).toHaveLength(2);

            expect(screen.getByText('Produit 1')).toBeInTheDocument();
            expect(screen.getByText('Produit 2')).toBeInTheDocument();
        })
    })

    it("AddProduct to cart", async () => {
        // eslint-disable-next-line no-undef
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([
                {
                    id: 1,
                    title: 'Produit 1',
                    price: 15,
                    category: "men's clothing",
                    image: 'image1.jpg'
                },
                {
                    id: 2,
                    title: 'Produit 2',
                    price: 35,
                    category: "women's clothing",
                    image: 'image2.jpg'
                }
            ])
        });

        // eslint-disable-next-line no-undef
        const { useGlobalContext } = require('../context/GlobalContext');
        const addToCart = vi.fn();
        useGlobalContext.mockReturnValue({ addToCart });

        render(
            <BrowserRouter>
                <GlobalProvider>
                    <Home />
                </GlobalProvider>
            </BrowserRouter>
        );

        await waitFor(() => {
            const addToCartButtons = screen.getAllByRole('button').filter(button =>
                button.classList.contains('add-to-cart')
            );

            expect(addToCartButtons).toHaveLength(2);
            fireEvent.click(addToCartButtons[0]);

            expect(addToCart).toHaveBeenCalledWith({
                id: 1,
                title: 'Produit 1',
                price: 15,
                category: "men's clothing",
                image: 'image1.jpg'
            });
        });
    });
});
