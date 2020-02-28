import RequestContext = Excel.RequestContext;

export interface WorkbookInterface {

    /**
     *
     * @param context
     */
    loadDependencies(context: RequestContext): RequestContext;

    /**
     *
     * @param context
     */
    syncAndExecute(context: RequestContext): RequestContext;
}