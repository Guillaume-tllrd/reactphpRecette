import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


const ArticlePage = () => {
    const params = useParams();
    const id = params.id;
    const [articleData, setArticleData] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log(articleData.description);
    
    const rawTags= articleData.tags || '';
    const tagsArray = rawTags.split('.')
    .map(tag => tag.trim());

    const formatDate = (dateString) =>{
        const date = new Date(dateString);
        return date.toLocaleDateString('en-EN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }
   

    useEffect(() => {
        axios.get(`http://localhost:8005/articles.php?id=${id}`).then((res) => setArticleData(res.data[0]));
        setLoading(false);
    },[])
      
    // console.log(articleData.description.split('\n').map((paragraph, index) => `<p class="mx-4 my-4 lg:mx-5 xl:mx-7 2xl:mx-9"key=${index}>${paragraph}</p>`).join(''));
    
    const formatDescription = (description) => {
        return description.split('\n').map((paragraph, index) => `<p class="mx-4 my-4 lg:mx-5 xl:mx-7 2xl:mx-9"key=${index}>${paragraph}</p>`).join('');
    };
    // \n signifie un saut de ligne \n\n 2 sauts de lignes
        // Après avoir mappé toutes les sections en balises HTML, join('') les combine en une seule chaîne de caractères, sans aucun séparateur entre elles. 

            // d+ correspond à une ou plusieurs chiffres.
            // \. correspond à un point littéral (le point doit être échappé avec \
            // \s correspond à un espace.
            // g ici signifie qu'il faut chercher toutes les occurrences qui correspondent à ce motif dans le texte, et non pas seulement la première.
            //split est un tableau où chaque section du texte est séparée, et les numéros sont inclus dans le tableau en tant qu'éléments individuels
   
    const img = articleData.picture;
    const imgPath = "../../api/" + img;

    return (
        <div>
            <Header/>
            <div className='bg-amber-100 p-8 md:p-10 '>
                <div className='bg-white mx-auto'>
                   {loading ? (<h1>Loading...</h1>) : (
                    <>
                     <h1 className='font-scope py-2 text-center text-2xl'>{articleData.title}</h1>
                     <p className='mx-2 mb-2 md:mx-3 lg:mx-5 xl:mx-7 2xl:mx-9 font-semibold'>Tags : {tagsArray.map((tag, index) => ( <Link key={index} className='hover:underline pr-1 font-light'>{tag}</Link>) )}</p>
                     <img className='mx-auto' src={imgPath} alt="artcile picture" />
                     <p className='font-light italic text-center'>Published on {formatDate(articleData.date)}</p>
                     <div>
                     {articleData.description ? (
                        <div dangerouslySetInnerHTML={{ __html: formatDescription(articleData.description) }} />
                            ) : (
                                <p>Loading content...</p>
                            )}
                     </div>
                  
                        <p className='text-end px-5 py-2 font-light italic'>By  {articleData.user_name}</p>
                        
     
                    
                    </>

                )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ArticlePage;