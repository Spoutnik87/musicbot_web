import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContentTypeModel } from 'src/app/models/content-type.model';
import { ConfigService } from 'src/app/services';
import { ContentTypesStore } from './content-types.store';

@Injectable()
export class ContentTypesService {
  constructor(private configService: ConfigService, private httpClient: HttpClient, private contentTypesStore: ContentTypesStore) {}

  getAll(): void {
    this.contentTypesStore.setLoading(true);
    this.httpClient.get(`${this.configService.getApiUrl()}/content-type/list`).subscribe(
      (contentTypes: ContentTypeModel[]) => {
        this.contentTypesStore.set(
          contentTypes.map(contentType => ({
            id: contentType.id,
            contentType,
            loading: false,
            loaded: true,
          }))
        );
        this.contentTypesStore.setLoading(false);
      },
      () => {
        this.contentTypesStore.setLoading(false);
      }
    );
  }

  getById(id: string): void {
    this.contentTypesStore.upsert(id, current => ({
      id,
      contentType: {
        ...(current && current.contentType),
        id,
      },
      loading: true,
      loaded: false,
    }));
    this.httpClient.get(`${this.configService.getApiUrl()}/content-type/${id}`).subscribe(
      (contentType: ContentTypeModel) => {
        this.contentTypesStore.upsert(contentType.id, current => ({
          id: contentType.id,
          contentType: {
            ...(current && current.contentType),
            id: contentType.id,
            ...contentType,
          },
          loading: false,
          loaded: true,
        }));
      },
      () => {
        this.contentTypesStore.upsert(id, current => ({
          loading: false,
          loaded: false,
        }));
      }
    );
  }
}
