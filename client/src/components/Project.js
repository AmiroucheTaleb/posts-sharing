import React from "react";
import { Link } from "react-router-dom";

export default function Project({ project }) {
  return (
    <div className='w-full'>
      <Link to={`/project/view/${project?.id}`} state={project}>
        <>
          <div className='animate animate__animated animate__fadeIn'>
            <img
              className='h-56 w-full object-cover rounded-lg'
              src={project?.cover}
              alt='project cover'
            />
          </div>
          <div className='py-4 space-y-3'>
            <h2 className='text-xl md:text-2xl font-light'>{project?.name}</h2>
            <p className='text-md md:text-lg truncate'>{project?.overview}</p>
          </div>
        </>
      </Link>
    </div>
  );
}
