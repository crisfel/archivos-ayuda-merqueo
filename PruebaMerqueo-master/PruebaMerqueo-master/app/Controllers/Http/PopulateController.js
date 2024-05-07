'use strict'

class PopulateController {
    async inventory ({ request, response }) {
        const Inventory = use("App/Models/Inventory")
        const Inv = request.only(['inventory'])//Obtener datos
        
        await Inventory.truncate()//Borra los datos previamente existentes

        for (const inv of Inv.inventory) {
            const invent = new Inventory()
            invent.product_id = inv.id
            invent.quantity = inv.quantity
            invent.date = inv.date
            console.log("Inventario agregado: "+invent.toJSON());
            await invent.save()
        }

        return Inv
    }

    async providers ({ request, response }) {
        const Provider = use("App/Models/Provider")
        const Product = use("App/Models/Product")

        const Prov = request.only(['providers'])//Obtener datos

        await Provider.truncate()//Borra los datos previamente existentes

        for (const prov of Prov.providers) {
            const provider = new Provider()
            provider.id=prov.id
            provider.name=prov.name
            for (const pro of prov.products) {
                try
                {
                    const product = await Product.find(pro.productId)
                    product.provider_id = provider.id
                    await product.save()
                }catch(error)
                {
                    //console.log("Producto no existe")
                }
            }
            provider.save()
            //console.log("Provedor agregado: "+provider.toJSON())
        }
        return Prov
    }
    async orders ({error, request, response }) {
        const Order = use("App/Models/Order")
        const Product = use("App/Models/Product")
        const OrdersProducts = use("App/Models/OrdersProducts")

        const Ord = request.only(['orders'])//Obtener datos

        await Order.truncate()//Borra los datos previamente existentes
        await Product.truncate()//Borra los datos previamente existentes
        await OrdersProducts.truncate()//Borra los datos previamente existentes

        for (const ord of Ord.orders) {            
            const order = new Order()
            order.id = ord.id
            order.priority = ord.priority
            order.address = ord.address
            order.user = ord.user
            order.deliveryDate = ord.deliveryDate

            for (const pro of ord.products) {
                const product = await Product.find(pro.id)
                try
                {
                    const product = new Product()                    
                    product.name=pro.name
                    product.id=pro.id
                    product.save()
                    console.log("Producto agregado: "+product.toJSON())
                }catch(error)
                {
                    console.log("Producto ya existe")
                    
                }
                const op= new OrdersProducts()
                op.quantity=pro.quantity
                op.product_id=pro.id
                op.order_id=order.id
                await op.save()
            }
            await order.save()
            console.log("Orden agregada: "+order.toJSON());
        }
        return Ord
    }
}

module.exports = PopulateController
