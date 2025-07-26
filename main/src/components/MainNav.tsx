interface NavProps {
    current: "about" | "maker" | "home";
}

export const MainNav = (props: NavProps) => {
    return (
        <nav style={{ backgroundColor: '#f8f9fa', padding: '1rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <a href={props.current == "home" ? "#" : "/"} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                    AdventureBox
                </a>
                <div style={{ float: 'right' }}>
                    <a href="/adventure-maker" style={{ marginRight: '1rem', textDecoration: 'none', color: props.current == "maker" ? '#ccc' : 'black' }}>
                        Adventure Maker
                    </a>
                    <a href="/about" style={{ textDecoration: 'none', color: props.current == "about" ? '#ccc' : 'black' }}>
                        About
                    </a>
                </div>
            </div>
        </nav>
    );
};