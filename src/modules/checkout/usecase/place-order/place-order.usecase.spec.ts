import { v4 as uuidv4 } from 'uuid'
import Product from '../../domain/product.entity'
import ProductEntityDomain from '../../../product-adm/domain/product.entity'
import PlaceOrderUseCase from './place-order.usecase'
import * as DTO from './place-order.usecase.dto'
import Price from '../../../product-adm/domain/price.entity'

const mockDate = new Date()

describe("place order unit test", () => {
    describe("execute validate produdcts method", () => {
        // @ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase()

        it("should throw an error if no products are selecteds", async () => {
            
            const input: DTO.PlaceOrderUseCaseInputDto = {
                products: [],
                clientId: uuidv4()
            }

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
                new Error("Products array is empty")
            )
        })

        it("shoul throw an error if some products is out of stock", async () => {
            const productOne = {
                productId: uuidv4(),
                priceId: uuidv4(),
                stock: 0,
            }
            const productTwo = {
                productId: uuidv4(),
                priceId: uuidv4(),
                stock: 0,
            }
            const productThree = {
                productId: uuidv4(),
                priceId: uuidv4(),
                stock: 55,
            }
            const MockProductFacade = {
                checkStock: jest.fn().mockReturnValue(Promise.resolve({products: [productOne, productTwo, productThree]})),
                addProduct: jest.fn(),
                updateProduct: jest.fn(),
                deleteProduct: jest.fn(),
                findProduct: jest.fn(),
                getPrice: jest.fn(),
            }
            // @ts-expext-error - force set productFacade
            placeOrderUseCase["_productFacade"] = MockProductFacade

            const input: DTO.PlaceOrderUseCaseInputDto = {
                products: [
                    {
                        productId: productOne.productId,
                        priceId: productOne.priceId
                    },
                    {
                        productId: productTwo.productId,
                        priceId: productTwo.priceId
                    },
                    {
                        productId: productThree.productId,
                        priceId: productThree.priceId,
                    }
                ],
                clientId: uuidv4()
            }
            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
                new Error(`Some product is out of stock: ${JSON.stringify([productOne.productId, productTwo.productId])}`)
            )
            expect(MockProductFacade.checkStock).toHaveBeenCalledTimes(1)

        })
    })

    describe("execute getProducts method", () => {
        beforeAll(() => {
            jest.useFakeTimers("modern")
            jest.setSystemTime(mockDate)
        })
        afterAll(() => {
            jest.useRealTimers()
        })

        // @ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase()

        it("should throw an error if all of products are not found", async () => {
            const MockProductFacade = {
                checkStock: jest.fn(),
                addProduct: jest.fn(),
                updateProduct: jest.fn(),
                deleteProduct: jest.fn(),
                findProduct: jest.fn().mockReturnValue(Promise.resolve({products: []})),
                getPrice: jest.fn(),
            }

            // @ts-expext-error - force set productFacade
            placeOrderUseCase["_productFacade"] = MockProductFacade

            const input: DTO.PlaceOrderUseCaseInputDto = {
                products: [
                    {
                        productId: uuidv4(),
                        priceId: uuidv4()
                    },
                ],
                clientId: uuidv4()
            }

            expect(placeOrderUseCase["getProducts"](input)).rejects.toThrow(
                new Error (`Some product not found: ${JSON.stringify(input.products.map(item => item.productId))}`)
            )
        })

        it("should throw an error if products are not found", async () => {
            const productOne = {
                id: uuidv4(),
                name: 'product#01',
                description: 'description product#01',
                medias: ['media#00'],
                details: {
                    detail_one: 'detail_one',
                    detail_two: 'detail_two',
                },
                price: [
                    {
                        id: uuidv4(),
                        stock: 55,
                        label: 'label',
                        price: 96.66
                    }
                ],
                ableToSell: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            const productTwo = {
                id: uuidv4(),
                name: 'product#02',
                description: 'description product#02',
                medias: ['media#00'],
                details: {
                    detail_one: 'detail_one',
                    detail_two: 'detail_two',
                    detail_three: 'detail_three',
                },
                price: [
                    {
                        id: uuidv4(),
                        stock: 66,
                        label: 'gg',
                        price: 977.33
                    }
                ],
                ableToSell: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            const MockProductFacade = {
                checkStock: jest.fn(),
                addProduct: jest.fn(),
                updateProduct: jest.fn(),
                deleteProduct: jest.fn(),
                findProduct: jest.fn().mockReturnValue(Promise.resolve({products: [productOne]})),
                getPrice: jest.fn(),
            }

            // @ts-expext-error - force set productFacade
            placeOrderUseCase["_productFacade"] = MockProductFacade

            const input: DTO.PlaceOrderUseCaseInputDto = {
                products: [
                    {
                        productId: productOne.id,
                        priceId: productOne.price[0].id
                    },
                    {
                        productId: productTwo.id,
                        priceId: productTwo.price[0].id
                    },
                ],
                clientId: uuidv4()
            }

            expect(placeOrderUseCase["getProducts"](input)).rejects.toThrow(
                new Error (`Some product not found: ${JSON.stringify([input.products[1].productId])}`)
            )
        })

        it("should return products", async () => {
            const productOne = {
                id: uuidv4(),
                name: 'product#01',
                description: 'description product#01',
                medias: ['media#00'],
                details: {
                    detail_one: 'detail_one',
                    detail_two: 'detail_two',
                },
                price: [
                    {
                        id: uuidv4(),
                        stock: 55,
                        label: 'label',
                        price: 96.66
                    }
                ],
                ableToSell: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            const productTwo = {
                id: uuidv4(),
                name: 'product#02',
                description: 'description product#02',
                medias: ['media#00'],
                details: {
                    detail_one: 'detail_one',
                    detail_two: 'detail_two',
                    detail_three: 'detail_three',
                },
                price: [
                    {
                        id: uuidv4(),
                        stock: 66,
                        label: 'gg',
                        price: 977.33
                    }
                ],
                ableToSell: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            const MockProductFacade = {
                checkStock: jest.fn(),
                addProduct: jest.fn(),
                updateProduct: jest.fn(),
                deleteProduct: jest.fn(),
                findProduct: jest.fn().mockReturnValue(Promise.resolve({products: [productOne, productTwo]})),
                getPrice: jest.fn(),
            }

            // @ts-expext-error - force set productFacade
            placeOrderUseCase["_productFacade"] = MockProductFacade

            const input: DTO.PlaceOrderUseCaseInputDto = {
                products: [
                    {
                        productId: productOne.id,
                        priceId: productOne.price[0].id
                    },
                    {
                        productId: productTwo.id,
                        priceId: productTwo.price[0].id
                    },
                ],
                clientId: uuidv4()
            }
            
            await placeOrderUseCase["getProducts"](input)

            expect(placeOrderUseCase["_products"].length === 2)
            expect(MockProductFacade.findProduct).toHaveBeenCalledTimes(1)
        })
    })

    describe("execute method", () => {
        beforeAll(() => {
            jest.useFakeTimers("modern")
            jest.setSystemTime(mockDate)
        })
        afterAll(() => {
            jest.useRealTimers()
        })

        it("should throw an error when client not found", async () => {
            const mockClientFacade = {
                findClient: jest.fn().mockReturnValue(Promise.resolve({clients: []})),
                addClient: jest.fn()
            }
            // @ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase()
            // @ts-expext-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade
            const input: DTO.PlaceOrderUseCaseInputDto = {
                products: [
                    {
                        productId: uuidv4(),
                        priceId: uuidv4(),
                    },
                    {
                        productId: uuidv4(),
                        priceId: uuidv4(),
                    }
                ],
                clientId: uuidv4()
            }

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
                new Error("Client not found")
            )
        })

        it("should throw an error when products array are not valid", async () => {
            const mockClientFacade = {
                findClient: jest.fn().mockReturnValue(Promise.resolve({clients: [{}, {}]})),
                addClient: jest.fn()
            }
            // @ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase()
            // @ts-expext-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade

            const mockValidateProducts = jest
                // @ts-expect-error - spy on private method
                .spyOn(placeOrderUseCase, 'validateProducts')
                // @ts-expect-error - not return value
                .mockRejectedValue(new Error("Products array is empty"));
            
            const input: DTO.PlaceOrderUseCaseInputDto = {
                products: [],
                clientId: uuidv4()
            }

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
                new Error("Products array is empty")
            )
            expect(mockValidateProducts).toHaveBeenCalledTimes(1)
    
        })

        describe("place an order", () => {
            const products = [
                new ProductEntityDomain({
                    name: 'product name #00',
                    description: 'product description #00',
                    ableToSell: true,
                    medias: ['media #00'],
                    details: {
                        detail_one: 'detail_one'
                    },
                    price: [
                        new Price({
                            label: 'label',
                            price: 883.14,
                            stock: 77
                        })
                    ]
                }),
                new ProductEntityDomain({
                    name: 'product name #01',
                    description: 'product description #01',
                    ableToSell: true,
                    medias: ['media #00'],
                    details: {
                        detail_one: 'detail_one'
                    },
                    price: [
                        new Price({
                            label: 'label',
                            price:  986.77,
                            stock: 168
                        })
                    ]
                })
            ]

            const client = {
                id: uuidv4(),
                name: 'Italo',
                document: 'docuemnt',
                password: 'password',
                email: 'email@mail.com',
                address: {
                    street: 'street',
                    number: 'number',
                    complement: 'complement',
                    city: 'city',
                    state: 'state',
                    zipCode: 'zipCode',
                }
            }

            const mockClientFacade = {
                findClient: jest.fn().mockResolvedValue({clients: [client]}),
                addClient: jest.fn()
            }

            const mockPaymentFacade = {
                processPayment: jest.fn()
            }

            const mockCheckoutRepository = {
                add: jest.fn(),
                find: jest.fn()
            }

            const mockInvoiceFacade = {
                generateInvoice: jest.fn().mockResolvedValue({
                    id: uuidv4(),
                }),
                findInvoice: jest.fn()
            }

            const mockProductFacade = {
                findProduct: jest.fn().mockResolvedValue({products: 
                    products.map(prod => ({
                        id: prod.id,
                        name: prod.name,
                        description: prod.description,
                        medias: prod.medias,
                        details: prod.details,
                        price: prod.price.map(price => ({
                            id: price.id,
                            price: price.price,
                            label: price.label,
                            stock: price.stock
                        })),
                        ableToSell: prod.ableToSell,
                        createdAt: prod.createdAt,
                        updatedAt: prod.updatedAt,
                    }))
                }),
                addProduct: jest.fn(),
                getPrice: jest.fn(),
                checkStock: jest.fn(),
                updateProduct: jest.fn(),
                deleteProduct: jest.fn()
            }
                       
            const placeOrderUseCase = new PlaceOrderUseCase({
                clientFacade: mockClientFacade,
                productFacade: mockProductFacade,
                repository: mockCheckoutRepository,
                invoiceFacade: mockInvoiceFacade,
                paymentFacade: mockPaymentFacade
            })
            
            const mockValidateProducts = jest
            //@ts-expect-error spy on private method
            .spyOn(placeOrderUseCase, 'validateProducts')
            //@ts-expect-error spy on private method
            .mockResolvedValue(null)

            
            // const mockGetProducts = jest
            // //@ts-expect-error spy on private method
            // .spyOn(placeOrderUseCase, 'getProducts')
            // //@ts-expect-error spy on private method
            // .mockImplementation(() => products.map(prod => new Product({
            //     id: prod.id,
            //     name: prod.name,
            //     description: prod.description,
            //     price: prod.price[0].price,
            // })))

            it("shoud not be approved", async () => {
                mockPaymentFacade.processPayment = mockPaymentFacade.processPayment.mockReturnValue({
                    id: uuidv4(),
                    status: 'rejected',
                    orderId:  uuidv4(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    amount: (883.14 + 986.77)
                })

                const input: DTO.PlaceOrderUseCaseInputDto = {
                    clientId: client.id,
                    products: products.map(prod => ({
                        productId: prod.id,
                        priceId: prod.price[0].id,
                    }))
                }

                const output = await placeOrderUseCase.execute(input)

                expect(output.invoiceId).toBeNull()
                expect(output.total).toBe(883.14 + 986.77)

                expect(output.products).toStrictEqual(products.map(prod => ({
                    productId: prod.id,
                    price: prod.price[0].price,
                })))

                expect(mockClientFacade.findClient).toHaveBeenCalledTimes(1)
                expect(mockClientFacade.findClient).toHaveBeenCalledWith({id: client.id})

                expect(mockValidateProducts).toHaveBeenCalledTimes(1)
                expect(mockValidateProducts).toHaveBeenCalledWith(input)

                // expect(mockGetProducts).toHaveBeenCalledTimes(1)
                // expect(mockGetProducts).toHaveBeenCalledWith(input)
                
                expect(mockProductFacade.findProduct).toHaveBeenCalledTimes(1)
                expect(mockProductFacade.findProduct).toHaveBeenCalledWith({products: products.map(prod => ({id: prod.id}))})
                
                expect(placeOrderUseCase["_products"].length === 2)

                expect(mockCheckoutRepository.add).toHaveBeenCalledTimes(1)
                
                expect(mockPaymentFacade.processPayment).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                })

                expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledTimes(0)
            })  
            
            it("should be approved", async () => {
                mockPaymentFacade.processPayment = mockPaymentFacade.processPayment.mockReturnValue({
                    id: uuidv4(),
                    status: 'approved',
                    orderId:  uuidv4(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    amount: (883.14 + 986.77)
                })

                const input: DTO.PlaceOrderUseCaseInputDto = {
                    clientId: client.id,
                    products: products.map(prod => ({
                        productId: prod.id,
                        priceId: prod.price[0].id,
                    }))
                }

                const output = await placeOrderUseCase.execute(input)

                expect(output.invoiceId).toBeDefined()
                expect(output.total).toBe(883.14 + 986.77)

                expect(output.products).toStrictEqual(products.map(prod => ({
                    productId: prod.id,
                    price: prod.price[0].price,
                })))

                expect(mockClientFacade.findClient).toHaveBeenCalledTimes(1)
                expect(mockClientFacade.findClient).toHaveBeenCalledWith({id: client.id})

                expect(mockValidateProducts).toHaveBeenCalledTimes(1)
                expect(mockValidateProducts).toHaveBeenCalledWith(input)

                // expect(mockGetProducts).toHaveBeenCalledTimes(1)
                // expect(mockGetProducts).toHaveBeenCalledWith(input)
                
                expect(mockProductFacade.findProduct).toHaveBeenCalledTimes(1)
                expect(mockProductFacade.findProduct).toHaveBeenCalledWith({products: products.map(prod => ({id: prod.id}))})
                
                expect(placeOrderUseCase["_products"].length === 2)

                expect(mockCheckoutRepository.add).toHaveBeenCalledTimes(1)
                
                expect(mockPaymentFacade.processPayment).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                })

                expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledTimes(1)
                expect(mockInvoiceFacade.generateInvoice).toHaveBeenLastCalledWith({
                    name: client.name,
                    document: client.document,
                    street: client.address.street,
                    number: client.address.number,
                    complement: client.address.complement,
                    city: client.address.city,
                    state: client.address.state,
                    zipCode: client.address.zipCode,
                    items: products.map(product => ({
                        productId: product.id,
                        price: product.price[0].price,
                        name: product.name
                    }))
                })
            })
        })
    })
})