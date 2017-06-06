import pictures from './pictures';
import fs from 'fs';



// fs.readdir('./pic/',(err,files)=>{
// 	files.forEach(f=>{
// 		let split= f.split('_')[0];
// 		if(!isNaN(split)){
// 			fs.rename(`./pic/${f}`,`./pic/${f.replace(split + '_','')}`);
// 		}
// 	});
// });





let promises = pictures.map(pic=>{
	return new Promise(resolve=>{
		fs.exists(`./pic/${pic}.png`,e=>{
			if(e){
				resolve({pic,format:'png'});
			}
			else{
				fs.exists(`./pic/${pic}.jpeg`,ee=>{
					if(ee){
						resolve({pic,format:"jpeg"});
					}
					else{
						resolve({pic,format:false});
					}
				});
			}
		});
	});
});

Promise.all(promises).then(result=>{
	console.log(result);
})




