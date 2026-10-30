import { BrowserRouter, Route, Routes } from "react-router";
import ProductList from "./pages/ProductList.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

function App() {
    // 사용자의 주소를 읽어들여서 주소와 컴포넌트의 매칭 처리하는 파일
    // 페이지가 여러개로 늘어나면서 App 최상단 컴포넌트는 교통정리만 하는 파일이 되었음

    // 리엑트는 주소를 읽어들이지 않음. BrowserRouter를 통해 사용자의 URL(주소)를 동기화(읽어들임)


    return (
        <BrowserRouter>
            <Routes>
                {/* Route의 path에는 무조건 strind으로 쓰여야 함
                  element 안에는 컴포넌트(화면을 리턴하는 함수)가 들어가야 함*/}
                <Route path={"/"} element={<ProductList />} />
                <Route path={"/product/:id"} element={<ProductDetail />} />
                {/*    path={"/product/:id"} 라고 적게 되면, 사용자가 경로를 통해 화면을 요청할 때
                경로의 첫째자리는 pruduct여야 하고, 두 번재 자리는 아무 값이나 들어왔을 때
                그 '아무 값'을 id라는 이름을 붙여서 저장해야 하고
                <productDetail/> 컴포넌트를 실행해야 한느 구나라고 react-router는 생각함*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
