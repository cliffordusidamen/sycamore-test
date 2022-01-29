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
]

const cart = new Map()

export { wares, categories, cart }