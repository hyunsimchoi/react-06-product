import { useEffect, useState } from "react";
import "./ProductList.css";
import { Link } from "react-router";

function ProductList() {
    // 사용자가 "/"주소로 들어왔을 때 또는 컴포넌트=> 사용자가 목록을 보고 싶어하는 상황
    // 목록을 띄워주기 위해 목록 데이터를 백엔드에 요청
    // 받아와서 가공하고 state에 저장한 뒤 화면에 띄우면 끝
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=12")
            .then(res => res.json())
            .then(json => {
                setList(json.products);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);

            });
    }, []);

    if (loading) {
        return <p>상품을 불러오는 중...</p>;
    }

    return (
        <div className="container">
            <h1 style={{ textAlign: "center", color: "darkolivegreen" }}>Product List</h1>
            <div className="search-box">
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="all">전체 카테고리</option>
                    <option value="beauty">뷰티</option>
                    <option value="fragrances">향수</option>
                    <option value="furniture">가구</option>
                </select>

                <input
                    type="text"
                    placeholder="상품명을 검색하세요"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <nav className="category-nav">
                <button onClick={() => setCategory("all")}>전체</button>
                <button onClick={() => setCategory("beauty")}>뷰티</button>
                <button onClick={() => setCategory("fragrances")}>향수</button>
                <button onClick={() => setCategory("furniture")}>가구</button>
            </nav>

            <nav className="breadcrumb">
                <Link to="/">상품 목록</Link>
                <span> &gt; </span>
                <span>상품 상세</span>
            </nav>

            <div className="product-list">
                {list
                    .filter(
                        product =>
                            (category === "all" || product.category === category) &&
                            product.title.toLowerCase().includes(search.toLowerCase()),
                    )
                    .map(product => (
                        <div className="product-card" key={product.id}>
                            <img src={product.thumbnail} alt={product.title} />

                            <h3>{product.title}</h3>
                            <p>{product.brand}</p>
                            <p>⭐ {product.rating}</p>
                            <h3>${product.price}</h3>

                            <Link to={`/product/${product.id}`}>상세 보기</Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ProductList;
