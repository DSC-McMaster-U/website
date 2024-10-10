import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageCTACard from '@/app/components/ImageCTACard';
import Image from 'next/image';

describe('ImageCTACard', () => {
    const mockImage = <Image src="https://via.placeholder.com/150" alt="Test Image" width={150} height={150} />;
    const mockContent = <p>This is some content for the card.</p>;
    const mockCTA = <button>Click Me</button>;

    test('renders the ImageCTACard with the provided props', () => {
        render(<ImageCTACard Image={mockImage} Content={mockContent} CTA={mockCTA} />);

        // Check if the image is in the document
        expect(screen.getByAltText('Test Image')).toBeInTheDocument();

        // Check if the content is in the document
        expect(screen.getByText('This is some content for the card.')).toBeInTheDocument();

        // Check if the CTA button is in the document
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    test('applies the correct classes for hover effect', () => {
        const { container } = render(<ImageCTACard Image={mockImage} Content={mockContent} CTA={mockCTA} />);
        
        // Ensure the component is rendered with the correct initial classes
        expect(container.firstChild).toHaveClass('relative group w-full h-[32rem] bg-white dark:bg-google-grey dark:bg-opacity-10 rounded-md overflow-hidden shadow-lg p-1');

        // Simulate hover state
        const card = container.firstChild;
        expect(card).toHaveClass('group');
    });
});
