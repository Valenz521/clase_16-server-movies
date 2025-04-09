const axios = require('axios');

const index = async (req, res) =>{
    try {
        console.log(`${process.env.TMDB_BASE_URL}/movie/now_playing`);
        const movies = await axios.get(`${process.env.TMDB_BASE_URL}/movie/now_playing`,
            {params: {
            api_key:process.env.TMDB_API_KEY,
            language:'es-ES',
            region:'CO'
        }
    });
    return res.status(200).json({

        status: true,
        message:'Peliculas listadas dem forma correcta.',
        data:movies.data.results
    });

    } catch (error) {
    return res.status(500).json({
        status: false,
        message:`Error al recuperar las peliculas. ${error.message}`,
        data:null
    });
    }
}

module.exports = {
    index
}