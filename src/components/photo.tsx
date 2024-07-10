import { IPhoto } from "../lib/types/photo";

type Props = { photo: IPhoto };

const Photo = ({ photo }: Props) => {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 w-64">
      <img className="w-full h-auto rounded-t-xl" src={photo.thumbnailUrl} alt="Image Description" />
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{photo.title}</h3>
      </div>
    </div>
  );
};

export default Photo;
