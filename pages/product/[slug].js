import Layout from '../../src/components/Layout';
import { useRouter } from 'next/router';
import client from '../../src/components/ApolloClient';
import AddToCartButton from '../../src/components/cart/AddToCartButton';
import { PRODUCT_BY_SLUG_QUERY, PRODUCT_SLUGS } from '../../src/queries/product-by-slug';
import { isEmpty } from 'lodash';
import GalleryCarousel from "../../src/components/single-product/gallery-carousel";
import Price from "../../src/components/single-product/price";
import Link from 'next/link';

export default function Product(props) {
    const { product } = props;

    // console.log(product)

    const router = useRouter()

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <Layout title={"Jual " + product && product.name + " | IA Digital Printing"} pageType="product" product={product}>
            {product ? (
                <div className="content single-product container mx-auto mb-32 xl:px-0 pb-3">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="product-images">
                            {!isEmpty(product?.galleryImages?.nodes) ? (
                                <GalleryCarousel gallery={product?.galleryImages?.nodes} />
                            ) : !isEmpty(product.image) ? (
                                <img
                                    src={product?.image?.sourceUrl}
                                    alt="Product Image"
                                    width="100%"
                                    height="auto"
                                    srcSet={product?.image?.srcSet}
                                />
                            ) : null}
                        </div>
                        <div className="product-info px-4">
                            {product.allPaSeller.nodes.length ? product.allPaSeller.nodes.map((seller, index) => (
                                <Link href={"/seller/"+seller.slug} className="brand-name color-primary">{seller.name}</Link>
                            )) : ''}
                            <h4 className="product-view-title">{product.name}</h4>
                            {/* <div

                                dangerouslySetInnerHTML={{
                                    __html: product.description,
                                }}
                                className="product-description mb-5"
                            /> */}
                            <Price salesPrice={product?.price} regularPrice={product?.regularPrice} />
                        </div>
                    </div>

                </div>
            ) : (
                ''
            )}
        </Layout>
    );
};


export async function getStaticProps(context) {
    const { params: { slug } } = context

    const { data } = await client.query({
        query: PRODUCT_BY_SLUG_QUERY,
        variables: { slug }
    })

    return {
        props: {
            product: data?.product || {},
        },
        revalidate: 1
    };
}

export async function getStaticPaths() {
    const { data } = await client.query({
        query: PRODUCT_SLUGS
    })

    const pathsData = []

    data?.products?.nodes && data?.products?.nodes.map((product) => {
        if (!isEmpty(product?.slug)) {
            pathsData.push({ params: { slug: product?.slug } })
        }
    })

    return {
        paths: pathsData,
        fallback: true
    }
}
