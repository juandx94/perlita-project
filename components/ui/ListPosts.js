import { SadIcon } from "../icons";
import { PostItem } from "../Items";

const ListPosts = ({data}) => {
  return (
    <div className="max-w-3xl mx-auto">
      {!data ? 
        <div className="
        mx-auto
        bg-secondary
        rounded-sm 
        flex 
        flex-col 
        justify-center 
        items-center 
        text-center 
        p-2 
        m-2
        text-secondary
        font-bold 
        text-lg uppercase
        
        ">
          <SadIcon className="h-32 w-32 m-2" />
          <p className="m-2">No hay perlitas disponibles</p>
        </div> : data.map((item) => <PostItem key={item.id} item={item}/>)}
    </div>
  )
}

export default ListPosts;