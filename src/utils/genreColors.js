const colors = {
    'Action': '#2070b4',
    'Aventure': '#8dbc0c',
    'Animation': '#d2efe8',
    'Comédie': '#00cbfd',
    'Crime': '#9c100b',
    'Documentaire': '#ffffff',
    'Drame': '#e72315',
    'Familial': '#f48e00',
    'Fantastique': '#ffc700',
    'Histoire': '#008f5a',
    'Horreur': '#6d368b',
    'Musique': '#f4e500',
    'Mystère': '#2070b4',
    'Romance': '#c6247d',
    'Science-Fiction': '#3f4f99',
    'Téléfilm': '#d2d2d1',
    'Thriller': '#383434',
    'Guerre': '#784f3f',
    'Western': '#ef620b',
}

const getGenreColor = ({name}) => {
    return colors[name] ?? null
}

export default getGenreColor;
