'use strict'

class ListingController {
    async index({request, response}){
        const Rta={}
        Rta.status=200
        Rta.message="Dado el Id de un pedido, saber qué productos y qué cantidad pueden ser alistados según sistema de inventario y cuáles deben ser abastecidos por los proveedores."
        Rta["data"]={}
        const data={}
        data["inventory"]=[]
        data["providers"]=[]        
        
        const Id=request.input('Id')

        const Order = use("App/Models/Order")
        const OrdersProducts = use("App/Models/OrdersProducts")
        const Product = use("App/Models/Product")
        const Provider = use("App/Models/Provider")
        const Inventory = use("App/Models/Inventory")

        const order = await Order.findOrFail(Id)

        const ordersproducts= await OrdersProducts.query().where('order_id', '=', order.id).fetch()
        for(const op of ordersproducts.toJSON())
        {
            const product= await Product.find(op.product_id)
            const inventoryo= await Inventory.query().where('product_id', '=', product.id).fetch()
            try{
                        if(inventoryo.first().quantity<op.quantity)//no puede ser listado desde el inventario porque la orden pide más
                        {
                            //Se listan los que se puedan desde el inventario
                            var inventory={}
                            inventory.product_id=product.id
                            inventory.name=product.name
                            inventory.quantity=inventoryo.first().quantity
                            data.inventory.push(inventory)
                            //Los restantes se solicitan a proveedores
                            var providers={}
                            providers.product_id=product.id
                            providers.name=product.name
                            providers.quantity=op.quantity-inventoryo.first().quantity
                            data.providers.push(providers)
                        }
                        else//Si puede ser listado desde el inventario
                        {
                            var inventory={}
                            inventory.product_id=product.id
                            inventory.name=product.name
                            inventory.quantity=op.quantity
                            data.inventory.push(inventory)
                        }                    
                }catch(error)//No existe en inventario, se alista todo por proveedores
                {
                    var providers={}
                    providers.product_id=product.id
                    providers.name=product.name
                    providers.quantity=op.quantity
                    data.providers.push(providers)
                }
            }
            
            Rta.data=data

            
            return Rta
        }
}

module.exports = ListingController
