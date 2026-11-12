<header>
    <div class="links">
        <a href="/"><div class="link">~</div></a>
        <a href="/blog"><div class="link">blog</div></a>
        <a href="/projects"><div class="link">projects</div></a>
        <a href="/about"><div class="link">about</div></a>
    </div>

    <a href="https://thecasualdev.com" target="_blank"
        ><div class="main-site">thecasualdev.com</div></a
    >
</header>

<style>
    header {
        max-width: 1000px;
        margin: 0 auto;
        padding: 0px 5px;

        border-bottom: 2px dotted white;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    header a {
        text-decoration: none;
        color: inherit;
    }

    .links {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        grid-auto-columns: 1fr;
    }
    .link,
    .main-site {
        color: #f3f4f7;
        display: block;
        padding: 0.75rem 0.85rem;
        text-align: center;
    }
</style>
