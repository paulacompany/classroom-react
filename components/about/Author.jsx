import React from "react"

export default function Author() {

    return (
        <div>
            <h1 className="display-2 m-5">Author</h1>
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">FaceBook</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Leanne Graham</td>
                        <td>Sincere@april.biz</td>
                        <td>@Sincere</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Ervin Howell</td>
                        <td>Shanna@melissa.tv</td>
                        <td>@Shanna</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Clementine Bauch</td>
                        <td>Nathan@yesenia.net</td>
                        <td>@Nathan</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}