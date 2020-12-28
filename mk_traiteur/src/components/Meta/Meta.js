import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywor' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'MK Traiteur | Cuisine des Spécialités Africaines',
    description: 'Nous préparons les meilleurs plats',
    keywords: 'food, cook, cooking, african'
}

export default Meta
