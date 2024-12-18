import { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import TagsArticleForm from '../components/form/TagsArticleForm';


const ArticlePage = () => {
    const params = useParams();
    const id = params.id;
    const [articleData, setArticleData] = useState([]);
    const [loading, setLoading] = useState(true);

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
    //   console.log(articleData)
    // console.log(articleData.description.split('\n').map((paragraph, index) => `<p class="mx-4 my-4 lg:mx-5 xl:mx-7 2xl:mx-9"key=${index}>${paragraph}</p>`).join(''));
    
    const formatDescription = (description) => {
        return description.split('\n').map((paragraph, index) => `<p class="mx-4 my-4 lg:mx-5 xl:mx-7 2xl:mx-9"key=${index}>${paragraph}</p>`).join('');
    };

    // \n signifie un saut de ligne \n\n 2 sauts de lignes
        // Après avoir mappé toutes les sections en balises HTML, join('') les combine en une seule chaîne de caractères, sans aucun séparateur entre elles. 
   
    const img = articleData.picture;
    const imgPath = "../../api/" + img;

    return (
        <div>
            <Header/>
            <div className='bg-amber-100 p-8 md:p-10 '>
                <article className='bg-white mx-auto'>
                   {loading ? (<h1>Loading...</h1>) : (
                    <>
                     <h1 className='font-scope py-2 text-center text-2xl'>{articleData.title}</h1>
                        <TagsArticleForm articleData={articleData} />
                     <img className='mx-auto' src={imgPath} alt="artcile picture" />
                     <p className='font-light italic text-center'>Published on {formatDate(articleData.date)}</p>
                     <div>
                        {/* dangerouslySetInnerHTML permet d'insérer directement du code html dans un composant react */}
                     {articleData.description ? (
                        <div dangerouslySetInnerHTML={{ __html: formatDescription(articleData.description) }} />
                            ) : (
                                <p>Loading content...</p>
                            )}
                     </div>
                        <p className='text-end px-5 py-2 font-light italic'>By  {articleData.user_name}</p>

                    </>

                )}
                </article>
            </div>
            <Footer/>
        </div>
    );
};

export default ArticlePage;