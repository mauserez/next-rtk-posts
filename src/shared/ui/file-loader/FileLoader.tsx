/* import React, { ReactNode } from "react";
import * from fs

type FileLoaderProps = { children: ReactNode };
export const FileLoader = (props: FileLoaderProps) => {

	const files = req.files

const uploadFiles = files.map((file) => {
   return new Promise(function (resolve, reject) {
       let fileFormat = file.originalname.split('.');
       let savePath = file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1];
       fs.writeFile('./public/uploads/' + savePath, file.buffer, function (err) {
         if (err) {
            return reject();
         }

         return resolve();
      });
   });
});

await Promise.all(uploadFiles);
	return <div>FileLoader</div>;
};
 */
