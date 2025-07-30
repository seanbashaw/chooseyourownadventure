interface NavProps {
    current: "about" | "maker" | "home" | "adventures";
}

export const MainNav = (props: NavProps) => {
    return (
        <nav style={{ backgroundColor: '#f8f9fa', padding: '1rem' }}>
                <a href={props.current == "home" ? "#" : "/"} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                    AdventureBox
                </a>
                <div style={{ float: 'right' }}>
                    <a href="/adventure-maker" style={{color: props.current == "maker" ? '#ccc' : 'black' }}>
                        Adventure Maker
                    </a>
                    <a href="/adventures" style={{ color: props.current == "about" ? '#ccc' : 'black' }}>
                        Adventures
                    </a>
                    <a href="/about" style={{ color: props.current == "adventures" ? '#ccc' : 'black' }}>
                        About
                    </a>
                </div>
        </nav>
    );
};