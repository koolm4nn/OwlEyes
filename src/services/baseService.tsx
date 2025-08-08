
/**
 * Base class for the service layer.
 * 
 * This layer acts as mediator between the controller/API layer and the data access layer/repository.
 * It can be used to apply validations, transformations, or additional logic before or after data is persisted.
 */
export abstract class BaseService<TRepo>{
    protected repo : TRepo;

    constructor(repo: TRepo){
        this.repo = repo;
    }
}