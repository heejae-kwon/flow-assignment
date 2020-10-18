테이블 스키마 입니다 (postgresql 사용)
\d extensions
                                     Table "public.extensions"
  Column   |         Type          | Collation | Nullable |                Default                 
-----------+-----------------------+-----------+----------+----------------------------------------
 id        | integer               |           | not null | nextval('extensions_id_seq'::regclass)
 extension | character varying(20) |           | not null | 
Indexes:
    "extensions_pkey" PRIMARY KEY, btree (id)


CSS 활용이 미숙하여 프론트엔드 부분이 미흡해 보일 수 있는 점 양해 부탁드리겠습니다.
Insert api에서 이미 들어가있는 확장자를 체크 합니다.
제한조건에대해서 프론트와 백엔드, 둘다 체크하여 제한을 걸어주었습니다.
