export async function getFetchedData() {
    const data = await (await fetch('https://reqres.in/api/users?page=2')).json();
    return (
        data
    );
}
