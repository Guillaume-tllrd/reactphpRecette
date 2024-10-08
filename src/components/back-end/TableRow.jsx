import { Pencil, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteRecipe } from '../../Redux/actions/recipe.actions';
import EditRecipe from './EditRecipe';
import { useState } from 'react';


const TableRow = ({recipe}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const img1 = recipe.picture_1;
    const imgPath1= "../../../../api/" + img1;

    const img2 = recipe.picture_2;
    const imgPath2= "../../../../api/" + img2;

    const dispatch = useDispatch();

    function handleDeleteRecipe(){
        dispatch(deleteRecipe(recipe.id))
    }

    function handleOpenEditModal() {
        setIsEditModalOpen(true);
      }
    
      function handleCloseEditModal() {
        setIsEditModalOpen(false);
      }

    return (
        <>
        <tr key={recipe.id} className='border-b'> 
            <td className="px-4 py-5 font-medium border sm:pl-6">{recipe.name}</td>
            <td className="px-3 py-5 font-medium border">{recipe.ingredients}</td>
            
            <td className="px-3 py-5 font-medium border">
                <img src={imgPath1} alt={recipe.name} />
            </td>
            <td className="px-3 py-5 font-medium border">
                <img src={imgPath2} alt={recipe.name} className="w-16 h-16 object-cover" />
            </td>
            <td className="px-3 py-5 font-medium border">{recipe.description}</td>
            <td className="py-3 pl-6 pr-3 font-medium  border">
                <button onClick={handleOpenEditModal} className="rounded-md border p-1 hover:bg-gray-100 m-1">
                <Pencil className='w-5'/></button>
                <button onClick={handleDeleteRecipe} className="rounded-md border p-1 hover:bg-gray-100 m-1">
                <Trash2 className="w-5"/></button>
            </td>
            </tr>
            
         {isEditModalOpen && (
            // inset-0 est une combinaison qui correspond à appliquer top: 0, right: 0, bottom: 0, et left: 0. En d'autres termes, elle positionne l'élément à 0 pixels des bords de l'écran, ce qui permet de couvrir toute la zone visible de la fenêtre.
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
              <div className="bg-amber-100 p-10 rounded-lg shadow-lg max-h-screen w-full md:w-auto overflow-y-auto">
                <button onClick={handleCloseEditModal} className="text-right">✖️</button>
                <EditRecipe recipe={recipe} closeModal={handleCloseEditModal} />
              </div>
            </div>
          )}
          </>
    );
};

export default TableRow;