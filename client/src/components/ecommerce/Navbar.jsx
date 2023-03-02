import Icons from './Icons'

const Navbar = ({ renderIcons = true }) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="#!">Awesome Ecommerce</a>
                {renderIcons && <Icons />}

            </div>
        </nav>
    )
}

export default Navbar
