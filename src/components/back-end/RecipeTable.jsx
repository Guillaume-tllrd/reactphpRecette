import { useEffect, useState } from 'react';
import TableRow from './TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRecipes } from '../../Redux/actions/recipe.actions';
import EditRecipe from './EditRecipe';

const RecipeTable = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipeReducer.recipes);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentRecipe, setCurrentRecipe] = useState(null);

    useEffect(() => {
        dispatch(fetchAllRecipes());
    }, [dispatch]);

    const handleOpenEditModal = (recipe) => {
        setCurrentRecipe(recipe);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentRecipe(null);
    };

    return (
        <div className="w-full my-4">
            <table className="hidden w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-lg bg-gray-50 text-left text-sm font-normal ">
                    <tr className='border-white'>
                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Name</th>
                        <th scope="col" className="px-3 py-5 font-medium text-center">Ingredients</th>
                        <th scope="col" className="px-3 py-5 font-medium text-center">Picture 1</th>
                        <th scope="col" className="px-3 py-5 font-medium text-center">Picture 2</th>
                        <th scope="col" className="px-3 py-5 font-medium text-center">Description</th>
                        <th scope="col" className="py-3 pl-6 pr-3 font-medium text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="rounded-lg bg-white text-left text-sm font-normal border">
                    {recipes && recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <TableRow recipe={recipe} key={recipe.id} onOpenEditModal={handleOpenEditModal} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4">No recipes available</td>
                        </tr>
                    )}
                </tbody>
            </table>
                    {/* au départ j'avais mis la modale dans le tableRow mais on a pas le droit de mettre une div à l'intéroeur de tbody */}
            {isEditModalOpen && (
                // inset-0 est une combinaison qui correspond à appliquer top: 0, right: 0, bottom: 0, et left: 0. En d'autres termes, elle positionne l'élément à 0 pixels des bords de l'écran, ce qui permet de couvrir toute la zone visible de la fenêtre.
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
                    {/*overflow-y-auto permet de scroller le contenu à l'intérieur de la modale lorsque nécessaire */}
                    <div className="bg-amber-100 p-10 rounded-lg shadow-lg max-h-screen w-full md:w-auto overflow-y-auto">
                        {/* max-h-screen : Cela limite la hauteur du contenu de la modale pour qu'elle ne dépasse jamais la hauteur de l'écran et assure un comportement responsive, même sur des écrans plus petits. */}
                        <button onClick={handleCloseEditModal} className="text-right">✖️</button>
                        {currentRecipe && <EditRecipe recipe={currentRecipe} onCloseEditModal={handleCloseEditModal}/>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeTable;
