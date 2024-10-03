import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from '~/components/navbar';

// Mock components for testing routes
const Home = () => <div>Home Page</div>;
const Events = () => <div>Events Page</div>;
const Newsletter = () => <div>Newsletter Page</div>;
const Team = () => <div>Team Page</div>;

describe('Navbar Component', () => {
  it('renders the navbar correctly', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check if the home link is rendered
    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();

    // Check if the other links are rendered
    expect(screen.getByText(/Events/i)).toBeInTheDocument();
    expect(screen.getByText(/Newsletter/i)).toBeInTheDocument();
    expect(screen.getByText(/Team/i)).toBeInTheDocument();
  });

  it('has the correct link paths', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check the href attributes of each link
    expect(screen.getByText(/Home/i).closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText(/Events/i).closest('a')).toHaveAttribute('href', '/event');
    expect(screen.getByText(/Newsletter/i).closest('a')).toHaveAttribute('href', '/newsletter');
    expect(screen.getByText(/Team/i).closest('a')).toHaveAttribute('href', '/team');
  });
});
