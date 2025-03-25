import React, { useEffect, useState } from 'react';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import { AiOutlineClose} from "react-icons/ai"
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";

const SavedShows = () => {
    const [movies, setMovies] = useState([]);
    const { user } = UserAuth();

    const slideLeft = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    useEffect(() => {
        if (!user?.email) return; // Prevent query if no user email

        const unsubscribe = onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            const savedShows = doc.data()?.savedShows;
            console.log("Saved Shows:", savedShows);  // Log Firestore data
            setMovies(savedShows || []);  // Set movies or default to empty array
        });

        // Cleanup on component unmount
        return () => unsubscribe();
    }, [user?.email]);


    const movieRef = doc(db, 'users', `${user?.email}`)
    const deleteShow = async (passedID) => {
        try {
          const result = movies.filter((item) => item.id !== passedID)
          await updateDoc(movieRef, {
              savedShows: result
          })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>

            <div className='relative flex items-center group'>
                <MdChevronLeft
                    onClick={slideLeft}
                    className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                    size={40}
                />
                <div id="slider" className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth overflow-y-scroll no-scrollbar relative'>
                    {movies?.length === 0 ? (
                        <p className="text-white">No saved shows available</p>
                    ) : (
                        movies?.map((item, id) => (
                            <div key={id} className='w-[160px] sm:w-[200px] md:w-[240px] inline-block cursor-pointer relative p-2'>
                                {item?.img ? (
                                    <img className="w-full h-auto block" src={`https://image.tmdb.org/t/p/w500/${item.img}`} alt="Movie" />
                                ) : (
                                    <p className="text-white">No Image Available</p> // Fallback text for missing images
                                )}
                                <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 text-white opacity-0 hover:opacity-100'>
                                <p className='white-space-normal text-xs font-bold flex justify-center items-center h-full text-center'>
                                           {item?.title}
                                </p>
                <p onClick={()=> deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose /></p>
                            </div>
                            </div>
                        ))
                    )}
                </div>
                <MdChevronRight
                    onClick={slideRight}
                    className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                    size={40}
                />
            </div>
        </>
    );
};

export default SavedShows;
