import { hash } from "bcrypt";
import {v4 as uuidv4} from 'uuid'

import createConnection from '../index'

async function create() {
    
    const connection = await createConnection()
    
    const id = uuidv4();
    const password = await hash('admin', 8)
    
    await connection.query(
        `INSERT INTO users (
            id, name, password, email, driver_license, "isAdmin", created_at, avatar)
            VALUES ('${id}', 'admin', '${password}', 'admin@rentx.com.br', '', true, 'now()', '');`
            )

    await connection.close()
}
        
        
create().then(()=> console.log('user admin created!'))