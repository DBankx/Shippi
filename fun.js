//   const itemData = {
//     title,
//     subtitle,
//     brandName,
//     color,
//     size,
//     features,
//     modelNumber,
//     releaseDate,
//     description,
//     price,
//     quantity,
//     nameOfService,
//     weight,
//     height,
//     depth,
//     width,
//     shippingPrice,
//     returns,
//     productImages: mainFile,
//     category,
//     condition,
//     countryOrigin,
//     format,
//     domesticShipping,
//     internationalShipping,
//     itemLocation
//   };

//   const fileObjects = filelist.reduce((prevVal, currentVal) => {
//     const { originalFileObject } = currentVal;
//     return [...prevVal, originalFileObject];
//   }, []);
{
  console.log(items);
}

//   read file
//   const readFiles = (file) => {
//     if (file) {
//       const reader = new FileReader();
//       if (!file.length) {
//         reader.onload = (e) => {
//           const newImage = e.target.result;
//           if (!file.length) {
//             const { displayImages } = this.state;
//             this.setState(() => {
//               displayImages.push(newImage);
//               return {
//                 displayImages
//               };
//             });
//           }
//           // target.reset();
//         };
//         reader.removeEventListener('load', () => {});
//       }
//       if (!file.length) {
//         reader.readAsDataURL(file);
//       } else {
//         const { displayImages = [] } = this.state;
//         file.map((f) => {
//           const r = new FileReader();
//           r.onload = (e) => {
//             const image = e.target.result;
//             displayImages.push(image);
//           };
//           r.onloadend = () => {
//             this.setState(() => {
//               return {
//                 displayImages
//               };
//             });
//           };
//           r.readAsDataURL(f);
//           r.removeEventListener('load', () => {});
//         });
//       }
//     }
//   };

// onchange for image
//   const onchange = (e) => {
//     // readFiles(e.target.files['0'], e.current.target);
//     console.log(e);
//     setFileList(e.target.files['0']);
//   };

// const itemData = new FormData();
//   itemData.append('title', title);
//   itemData.append('subtitle', subtitle);
//   itemData.append('brandName', brandName);
//   itemData.append('condition', condition);
//   itemData.append('color', color);
//   itemData.append('size', size);
//   itemData.append('features', features);
//   itemData.append('modelNumber', modelNumber);
//   itemData.append('releaseDate', releaseDate);
//   itemData.append('description', description);
//   itemData.append('price', price);
//   itemData.append('quantity', quantity);
//   itemData.append('nameOfService', nameOfService);
//   itemData.append('weight', weight);
//   itemData.append('height', height);
//   itemData.append('depth', depth);
//   itemData.append('width', width);
//   itemData.append('shippingPrice', shippingPrice);
//   itemData.append('returns', returns);
//   itemData.append('category', category);
//   itemData.append('countryOrigin', countryOrigin);
//   itemData.append('format', format);
//   itemData.append('domesticShipping', domesticShipping);
//   itemData.append('internationalShipping', internationalShipping);
//   itemData.append('itemLocation', itemLocation);

//   var axios = require('axios');
//   var FormData = require('form-data');
//   var fs = require('fs');
//   var data = new FormData();
//   data.append('title', 'laughing cream');
//   data.append('price', '5.00');
//   data.append('subtitle', 'betterme');
//   data.append('weight', '10');
//   data.append('height', '10');
//   data.append('depth', '4');
//   data.append('width', '7');
//   data.append('countryOrigin', 'Nigeria');
//   data.append('category', 'tech');
//   data.append('condition', 'new');
//   data.append('quantity', '1');
//   data.append('returns', 'true');
//   data.append('color', 'black');
//   data.append('size', '11');
//   data.append('brandName', 'testx');
//   data.append('modelNumber', '11232432xx');
//   data.append('features', 'good pocket, slim waist');
//   data.append('description', 'good product');
//   data.append('shippingPrice', '8.20');
//   data.append(
//     'productImages',
//     fs.createReadStream('/C:/Users/Asus/Pictures/picture1.jpg')
//   );
//   data.append('format', 'Fixed Price');

//   var config = {
//     method: 'patch',
//     url: 'http://localhost:4000/api/product/edit/5f154eab07fd1115a8fd0722',
//     headers: {
//       'x-auth-token':
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYxNDJhOTFlMWQwZTcyZTg4YWQ5ODQxIn0sImlhdCI6MTU5NjI2Mzg1MywiZXhwIjoxNTk2MzI4ODUzfQ.URAkxq_ynnjwNwxqP4Xtu3J6nAHpGA_KeGtIBnwxFNU',
//       'Content-Type': 'multipart/form-data',
//       ...data.getHeaders()
//     },
//     data: data
//   };

//   axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
