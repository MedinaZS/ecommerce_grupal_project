const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="/admin/">Awesome Ecommerce</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><a className="nav-link" href="/admin/users">Users</a></li>
                        <li className="nav-item"><a className="nav-link" aria-current="page" href="/admin/categories">Categories</a></li>
                        <li className="nav-item"><a className="nav-link" href="/admin/products">Products</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
