const CATEGORIES = {
    BRACELETS: 1,
    EARRINGS: 2,
    RINGS: 3,
    NECKLACES: 4,
    SETS: 4,
    PENDANTS: 5,
}
const categoriesArray = [
    [CATEGORIES.BRACELETS, 'bracelets'],
    [CATEGORIES.EARRINGS, 'earrings'],
    [CATEGORIES.RINGS, 'rings'],
    [CATEGORIES.NECKLACES, 'necklaces'],
    [CATEGORIES.SETS, 'sets'],
    [CATEGORIES.PENDANTS, 'pendants'],
]

const categories = new Map(categoriesArray)

const wares = [
    {
        id: 1,
        category_id: CATEGORIES.BRACELETS,
        name: 'item 1',
        slug: 'item-1',
        price: 10000,
        description: 'description 1',
        thumbnail: 'https://via.placeholder.com/150',
        images: [
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
        ],
    },

    {
        id: 2,
        category_id: CATEGORIES.EARRINGS,
        name: 'item 2',
        slug: 'item-2',
        price: 10000,
        description: 'lorem ipsum dolor',
        thumbnail: 'https://via.placeholder.com/150',
        images: [
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
        ],
    },

    {
        id: 3,
        category_id: CATEGORIES.PENDANTS,
        name: 'item 3',
        slug: 'item-3',
        price: 8370,
        description: 'lorem ipsum dolor',
        thumbnail: 'https://via.placeholder.com/150',
        images: [
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
        ],
    },

    {
        id: 4,
        category_id: CATEGORIES.EARRINGS,
        name: 'item 4',
        slug: 'item-4',
        price: 47099,
        description: 'lorem ipsum dolor',
        thumbnail: 'https://via.placeholder.com/150',
        images: [
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
        ],
    },

    {
        id: 5,
        category_id: CATEGORIES.RINGS,
        name: 'item 5',
        slug: 'item-5',
        price: 301900,
        description: 'lorem ipsum dolor',
        thumbnail: 'https://via.placeholder.com/150',
        images: [
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
        ],
    },

    {
        id: 6,
        category_id: CATEGORIES.EARRINGS,
        name: 'item 6',
        slug: 'item-6',
        price: 88050,
        description: 'lorem ipsum dolor',
        thumbnail: 'https://via.placeholder.com/150',
        images: [
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
        ],
    },

    {
        id: 7,
        category_id: CATEGORIES.EARRINGS,
        name: 'item 7',
        slug: 'item-7',
        price: 156000,
        description: 'lorem ipsum dolor',
        thumbnail: 'https://via.placeholder.com/150',
        images: [
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
        ],
    },

    {
        id: 8,
        category_id: CATEGORIES.SETS,
        name: 'item 8',
        slug: 'item-8',
        price: 1780000,
        description: 'lorem ipsum dolor',
        thumbnail: 'https://via.placeholder.com/150',
        images: [
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
            'https://via.placeholder.com/250',
        ],
    },
]


export { wares, categories }