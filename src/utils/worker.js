import workerpool from 'workerpool';
import fibonacci from './fibonacci.js';
import load_csv from './csv.js';
import {
    getAllUsersService,
    getOneUserService,
    insertUsersFromCsvFileService
} from '../services/user.service.js';

workerpool.worker({
    load_csv,
    fibonacci,
    getOneUserService,
    getAllUsersService,
    insertUsersFromCsvFileService
});
