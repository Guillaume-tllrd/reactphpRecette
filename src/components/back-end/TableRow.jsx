import { Pencil, Trash2 } from 'lucide-react';
import DeleteRecipe from './DeleteRecipe';
import { useDispatch } from 'react-redux';


const TableRow = ({recipe}) => {
    const img1 = recipe.picture_1;
    const imgPath1= "../../../../api/" + img1;

    const img2 = recipe.picture_2;
    const imgPath2= "../../../../api/" + img2;

    const dispatch = useDispatch();

    function handleDeleteRecipe(){
        dispatch(DeleteRecipe(recipe.id))
    }

    return (
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
                <button className="rounded-md border p-1 hover:bg-gray-100 m-1">
                <Pencil className='w-5'/></button>
                <button onClick={handleDeleteRecipe} className="rounded-md border p-1 hover:bg-gray-100 m-1">
                <Trash2 className="w-5"/></button>
            </td>
            </tr>
        
    );
};

export default TableRow;