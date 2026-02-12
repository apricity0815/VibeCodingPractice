
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'tshirt',
    name: 'Classic T-Shirt',
    description: 'High-quality cotton t-shirt on a studio mannequin.',
    thumbnail: 'https://picsum.photos/seed/tshirt/300/300',
    prompt: 'A professional studio product shot of a high-quality cotton t-shirt on a clean mannequin, white background.'
  },
  {
    id: 'hoodie',
    name: 'Streetwear Hoodie',
    description: 'Heavyweight fleece hoodie with a modern fit.',
    thumbnail: 'https://picsum.photos/seed/hoodie/300/300',
    prompt: 'A cinematic streetwear product shot of a premium fleece hoodie worn by a faceless model in an urban alleyway.'
  },
  {
    id: 'mug',
    name: 'Ceramic Mug',
    description: 'Standard 11oz white ceramic coffee mug.',
    thumbnail: 'https://picsum.photos/seed/mug/300/300',
    prompt: 'A cozy morning lifestyle shot of a white ceramic coffee mug sitting on a wooden desk next to a laptop.'
  },
  {
    id: 'totebag',
    name: 'Eco Tote Bag',
    description: 'Organic canvas tote bag for sustainable shopping.',
    thumbnail: 'https://picsum.photos/seed/tote/300/300',
    prompt: 'A flat-lay shot of an organic canvas tote bag on a minimalist background with aesthetic foliage.'
  },
  {
    id: 'cap',
    name: 'Dad Hat',
    description: 'Unstructured 6-panel cotton twill cap.',
    thumbnail: 'https://picsum.photos/seed/cap/300/300',
    prompt: 'A clean product photo of a cotton twill baseball cap on a plain pedestal.'
  }
];

export const SYSTEM_INSTRUCTIONS = `You are an expert product photographer and mockup specialist. 
Your goal is to take a provided logo and realistically place it on a specific product. 
Ensure the logo follows the contours, fabric texture, and lighting of the product perfectly. 
Do not distort the logo unless it is necessary for perspective.
The resulting image should look like a professional brand marketing photo.`;
