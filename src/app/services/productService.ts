
export const runtime = 'nodejs';

import { initializeDataSourceProduct } from '../lib/data-source'
import { Products } from '../lib/entity/Products'
// import { promises as fs } from 'fs'
import { writeFile, unlink, stat } from 'fs/promises';
import path from 'path'

import { optionService } from '../services/optionService'
import { buffer } from 'stream/consumers'

export class productService {
    public async insert(name: string, price: string, image: File) {

        const option = new optionService()
        const db = await initializeDataSourceProduct()
        const procductRepo = db.getRepository(Products)
        const code = await option.randomCode(procductRepo)
        const product = new Products()
        let imageName = ''
        if (image.size > 0) {

            const d = new Date(2018, 3, 1); // Your date
            const dStart = new Date(1970, 1, 1);
            const dateDifference = ((d.getTime() - dStart.getTime()) * 10000);
            const fileExt = image.name.split('.').pop()
            const fileName = `img-${Date.now()}.${fileExt}`;
            const imageName = `${dateDifference}-${fileName}`
            const filePath = path.join(process.cwd(), 'public', 'product', imageName);
            product.Products_image = imageName
            await writeFile(filePath, Buffer.from(await image.arrayBuffer()))

            // fs.writeFile(`${process.cwd()}/public/product/${imageName}`, Buffer.from(await image.arrayBuffer()))

        }

        if (!product.Products_image) product.Products_image = imageName

        product.Products_sku = code
        product.Products_name = name
        product.Products_price = price
        product.created_at = new Date()
        product.updated_at = new Date()
        return await procductRepo.save(product)

    }

    public async update(id: number, name: string, price: string, image: File) {
        const db = await initializeDataSourceProduct()
        // console.log(id, name, price, image)
        const procductRepo = await db.getRepository(Products)
        const request = await procductRepo.findOne({ where: { Products_id: id } })
        if (request) {
            let getImage = request.Products_image
            if (image.size > 0) {
                if (getImage) {
                    const filePath = path.join(process.cwd(), 'public', 'product', getImage);
                    if (await stat(filePath)) { // เช็กว่าไฟล์มีอยู่ก่อน
                        await unlink(filePath) // ลบไฟล์
                    }
                }

                const d = new Date(2018, 3, 1); // Your date
                const dStart = new Date(1970, 1, 1);
                const dateDifference = ((d.getTime() - dStart.getTime()) * 10000);
                const fileExt = image.name.split('.').pop()
                const fileName = `img-${Date.now()}.${fileExt}`;
                const imageName = `${dateDifference}-${fileName}`
                const filePath = path.join(process.cwd(), 'public', 'product', imageName);

                await writeFile(filePath, Buffer.from(await image.arrayBuffer()))
                await procductRepo.update({ Products_id: id }, { Products_name: name, Products_price: price, Products_image: imageName, updated_at: new Date() })
            } else {
                await procductRepo.update({ Products_id: id }, { Products_name: name, Products_price: price, updated_at: new Date() })
            }


            return await procductRepo.findOne({ where: { Products_id: id } });

        }


    }

    public async delete(id: number) {
        const db = await initializeDataSourceProduct()
        const procductRepo = await db.getRepository(Products)


        const request = await procductRepo.findOne({ where: { Products_id: id } })
        if(request){
            const getImage = request.Products_image
            if(getImage){
                const filePath = path.join(process.cwd(), 'public', 'product', getImage);
                try {
                    await stat(filePath) // เช็กว่าไฟล์มีอยู่ก่อน
                    await unlink(filePath) // ลบไฟล์
                }catch(err){
                    console.log(err)
                }
            }

            await procductRepo.delete({ Products_id: id })
            return await this.selectAll()
        }
        return [{status:201, message:'data has been deleted'}]
    }

    public async selectID(id: number) {
        const db = await initializeDataSourceProduct()
        const procductRepo = await db.getRepository(Products)
        return procductRepo.findOne({ where: { Products_id: id } })
    }

    public async selectAll() {
        const db = await initializeDataSourceProduct()
        const procductRepo = await db.getRepository(Products)
        return procductRepo.find({ where: { Products_status: (0).toString() } })
    }

}