import pictures from './pictures';
import fs from 'fs';
import jsonfile from 'jsonfile';






const fileName = "./pictures.json";
jsonfile.readFile(fileName,(err,pictures)=>{
	console.log(err);
	let promises = pictures.map(picture=>{
		let {pic} = picture;
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
		jsonfile.writeFile(fileName,result,{space:2});
	});
});






