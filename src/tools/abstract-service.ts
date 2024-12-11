import { HttpClient } from "@angular/common/http"
import { inject } from "@angular/core"

export abstract class AbstractService<T extends {id: number}> {

  protected http: HttpClient = inject(HttpClient)
  protected abstract readonly ENDPOINT: string

  all() {
    return this.http.get<T[]>(this.ENDPOINT)
  }

  byId(id: number) {
    return this.http.get<T>(`${this.ENDPOINT}/${id}`)
  }

  save(entity: T) {
    return this.http.post<T>(this.ENDPOINT, entity)
  }

  update(entity: T) {
    return this.http.put<T>(`${this.ENDPOINT}/${entity.id}`, entity)
  }

  delete(id: number) {
    return this.http.delete<T>(`${this.ENDPOINT}/${id}`)
  }

}
