import cloudinary from 'cloudinary';
import pictures from './pictures';
import fs from 'fs';
import jsonfile from 'jsonfile';

cloudinary.config({ 
  cloud_name: 'shopkeeper-mt', 
  api_key: '156887998232998', 
  api_secret: 'XI0icVrIctxGn9P7Z8pEJU0b49A' 
});


const fileName = "./pictures.json";

jsonfile.readFile(fileName,(err,images)=>{
	let promises = images.map((i,index)=>{
		return new Promise((r,j)=>{
			let {pic,format,completed} = i;
			if(completed)
				r(true);
			else{
				cloudinary.uploader.upload(`./pic/${pic}.${format}`,
					result=>{
						if(result.error){
							console.log(`File "${pic}" is failed.`);
							console.log(result);
							console.log("................");
							r(result);
						}else{
							i.completed=true;
							images[index] = i;
							console.log(`File "${pic}" is completed.`);
							console.log(result);
							console.log("................");
							r(result);
						}
					},
					{
						public_id:`shopkeeper/product/${pic}`,
						tags:['Shopkeeper', 'immoderate']
					}
				);
			}
		});
	});
	Promise.all(promises).then(result=>{
		console.log("All completed.");
	})
	.catch(error=>{
		console.log(error);
	}).then(()=>{
		jsonfile.writeFile(fileName,images,{space:2},err=>{
			if(err){
				console.log(err);
			}else{
				console.log("Progress saved!.");
			}
		});
	});
})







