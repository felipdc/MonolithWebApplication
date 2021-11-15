--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8 (Debian 12.8-1.pgdg110+1)
-- Dumped by pg_dump version 13.3

-- Started on 2021-11-13 18:50:02

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3036 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 16861)
-- Name: cupom; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cupom (
    codigo character varying NOT NULL,
    descricao character varying,
    desconto character varying,
    status character varying,
    tipodesconto character varying DEFAULT 'absoluto'::character varying NOT NULL,
    validade timestamp without time zone
);


ALTER TABLE public.cupom OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16920)
-- Name: itempedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.itempedido (
    id integer NOT NULL,
    "pedidoId" integer NOT NULL,
    "produtoId" integer NOT NULL,
    quantidade integer NOT NULL
);


ALTER TABLE public.itempedido OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16918)
-- Name: detalhespedido_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalhespedido_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.detalhespedido_id_seq OWNER TO postgres;

--
-- TOC entry 3037 (class 0 OID 0)
-- Dependencies: 211
-- Name: detalhespedido_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalhespedido_id_seq OWNED BY public.itempedido.id;


--
-- TOC entry 204 (class 1259 OID 16871)
-- Name: parcelapagamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parcelapagamento (
    id integer NOT NULL,
    "pedidoId" integer,
    valor integer NOT NULL,
    status character varying,
    datalimite timestamp without time zone,
    datapagamento timestamp without time zone,
    numeroparcela integer
);


ALTER TABLE public.parcelapagamento OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16869)
-- Name: parcelapagamento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parcelapagamento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.parcelapagamento_id_seq OWNER TO postgres;

--
-- TOC entry 3038 (class 0 OID 0)
-- Dependencies: 203
-- Name: parcelapagamento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parcelapagamento_id_seq OWNED BY public.parcelapagamento.id;


--
-- TOC entry 206 (class 1259 OID 16882)
-- Name: pedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pedido (
    id integer NOT NULL,
    "usuarioEmail" character varying NOT NULL,
    "cupomCodigo" character varying,
    precototal integer DEFAULT 0 NOT NULL,
    precofinal integer DEFAULT 0 NOT NULL,
    status character varying DEFAULT 'incompleto'::character varying NOT NULL,
    tipopagamento character varying,
    qtdparcelas integer,
    data timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.pedido OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16880)
-- Name: pedido_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pedido_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pedido_id_seq OWNER TO postgres;

--
-- TOC entry 3039 (class 0 OID 0)
-- Dependencies: 205
-- Name: pedido_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pedido_id_seq OWNED BY public.pedido.id;


--
-- TOC entry 210 (class 1259 OID 16909)
-- Name: produto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produto (
    id integer NOT NULL,
    nome character varying NOT NULL,
    categoria character varying,
    "preço" integer,
    quantidade integer,
    status character varying NOT NULL
);


ALTER TABLE public.produto OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16907)
-- Name: produto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.produto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.produto_id_seq OWNER TO postgres;

--
-- TOC entry 3040 (class 0 OID 0)
-- Dependencies: 209
-- Name: produto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.produto_id_seq OWNED BY public.produto.id;


--
-- TOC entry 207 (class 1259 OID 16891)
-- Name: usocupom; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usocupom (
    "cupomCodigo" character varying NOT NULL,
    "usuarioEmail" character varying NOT NULL,
    data timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying
);


ALTER TABLE public.usocupom OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16899)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    email character varying(255) NOT NULL,
    nome character varying(255),
    telefone character varying(30),
    senha character varying(255),
    status character varying(30),
    cep character varying(30),
    uf character varying(30),
    cidade character varying(255),
    logradouro character varying(255)
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 2872 (class 2604 OID 16923)
-- Name: itempedido id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itempedido ALTER COLUMN id SET DEFAULT nextval('public.detalhespedido_id_seq'::regclass);


--
-- TOC entry 2864 (class 2604 OID 16874)
-- Name: parcelapagamento id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parcelapagamento ALTER COLUMN id SET DEFAULT nextval('public.parcelapagamento_id_seq'::regclass);


--
-- TOC entry 2865 (class 2604 OID 16885)
-- Name: pedido id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido ALTER COLUMN id SET DEFAULT nextval('public.pedido_id_seq'::regclass);


--
-- TOC entry 2871 (class 2604 OID 16912)
-- Name: produto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto ALTER COLUMN id SET DEFAULT nextval('public.produto_id_seq'::regclass);


--
-- TOC entry 3020 (class 0 OID 16861)
-- Dependencies: 202
-- Data for Name: cupom; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cupom (codigo, descricao, desconto, status, tipodesconto, validade) FROM stdin;
CUPOM5	\N	5	ativo	absoluto	2021-12-19 13:23:54
CUPOM2	\N	200	ativo	absoluto	2021-12-19 13:23:54
CUPOM10	\N	1000	ativo	absoluto	\N
\.


--
-- TOC entry 3030 (class 0 OID 16920)
-- Dependencies: 212
-- Data for Name: itempedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.itempedido (id, "pedidoId", "produtoId", quantidade) FROM stdin;
1	17	1	5
2	17	3	5
5	17	3	5
6	17	3	5
7	17	3	5
8	17	3	5
9	17	3	5
12	12	1	1
13	19	1	1
\.


--
-- TOC entry 3022 (class 0 OID 16871)
-- Dependencies: 204
-- Data for Name: parcelapagamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parcelapagamento (id, "pedidoId", valor, status, datalimite, datapagamento, numeroparcela) FROM stdin;
1	17	1000	\N	\N	\N	\N
2	17	1000	\N	\N	\N	\N
3	17	500	\N	\N	\N	\N
4	17	500	\N	\N	\N	\N
5	17	500	\N	\N	\N	\N
6	17	500	\N	\N	\N	\N
7	17	500	\N	\N	\N	\N
8	17	500	\N	\N	\N	\N
9	17	500	\N	\N	\N	\N
10	17	500	\N	\N	\N	\N
11	17	500	\N	\N	\N	\N
12	17	500	\N	\N	\N	\N
13	12	500	\N	2021-12-13 21:22:59.093	\N	\N
14	12	500	\N	2021-12-13 21:22:59.095	\N	\N
15	19	500	\N	2021-11-13 21:26:32.974	\N	\N
16	19	500	\N	2021-12-13 21:26:32.976	\N	\N
17	19	500	pagamento pendente	2021-12-13 21:36:17.942	\N	\N
18	19	500	pagamento pendente	2022-01-13 21:36:17.943	\N	\N
19	19	500	pagamento pendente	2021-12-13 21:36:59.88	\N	0
20	19	500	pagamento pendente	2022-01-13 21:36:59.882	\N	1
\.


--
-- TOC entry 3024 (class 0 OID 16882)
-- Dependencies: 206
-- Data for Name: pedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pedido (id, "usuarioEmail", "cupomCodigo", precototal, precofinal, status, tipopagamento, qtdparcelas, data) FROM stdin;
4	gabriel@gmail.com	\N	0	0	incompleto	\N	\N	\N
6	felipetdecarli@gmail.com	\N	0	0	incompleto	\N	\N	\N
7	felipetdecarli@gmail.com	\N	0	0	incompleto	\N	\N	2021-11-12 00:00:00
8	felipetdecarli@gmail.com	\N	0	0	incompleto	\N	\N	2021-11-12 21:26:15.001961
9	felipetdecarli@gmail.com	CUPOM10	0	0	incompleto	\N	\N	2021-11-12 21:27:05.467328
11	felipetdecarli@gmail.com	CUPOM2	0	0	incompleto	\N	\N	2021-11-12 21:28:45.25092
2	gabriel@gmail.com	CUPOM10	5000	4000	incompleto	\N	\N	\N
13	felipetdecarli@gmail.com	\N	0	0	incompleto	\N	\N	2021-11-12 22:01:12.002732
18	felipetdecarli@gmail.com	CUPOM10	0	0	incompleto	\N	\N	2021-11-13 17:59:40.165048
12	felipetdecarli@gmail.com	CUPOM2	1000	800	pagamento pendente	boleto	2	2021-11-12 22:01:01.441388
17	felipetdecarli@gmail.com	CUPOM10	2500	0	incompleto	boleto	5	2021-11-12 22:39:15.31094
19	felipetdecarli@gmail.com	\N	1000	1000	pagamento pendente	boleto	2	2021-11-13 21:24:30.419143
\.


--
-- TOC entry 3028 (class 0 OID 16909)
-- Dependencies: 210
-- Data for Name: produto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produto (id, nome, categoria, "preço", quantidade, status) FROM stdin;
2	Limão kg	Frutas	800	5	disponível
3	Feijão 1kg	Alimentos	250	25	disponível
1	Arroz 5kg	Alimentos	1000	0	indisponível
\.


--
-- TOC entry 3025 (class 0 OID 16891)
-- Dependencies: 207
-- Data for Name: usocupom; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usocupom ("cupomCodigo", "usuarioEmail", data, status) FROM stdin;
CUPOM2	felipetdecarli@gmail.com	2021-11-12 22:39:15.30662	\N
CUPOM10	felipetdecarli@gmail.com	2021-11-13 17:59:40.165048	\N
\.


--
-- TOC entry 3026 (class 0 OID 16899)
-- Dependencies: 208
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (email, nome, telefone, senha, status, cep, uf, cidade, logradouro) FROM stdin;
felipedecarli@gmail.com	\N	\N	\N	\N	\N	\N	\N	\N
felipedecar2li@gmail.com	\N	\N	\N	\N	\N	\N	\N	\N
lucas@gmail.com	Felipe tiago	449932346823	e9f5c5240c0bb39488e6dbfbdb1517e0	\N	86591909	\N	\N	\N
carlos@gmail.com	Felipe tiago	449932346823	e9f5c5240c0bb39488e6dbfbdb1517e0	\N	86591909	\N	\N	\N
robreto@gmail.com	Robreto tiago	132312312	071aa21e56eb020c9858679ab8ce044e	ativo	12313251	\N	\N	\N
felipetdecarli@gmail.com	felipe	\N	123456qwe	inativo	\N	\N	\N	\N
gabriel@gmail.com	Gabriel atualizado	99942942141	e9f5c5240c0bb39488e6dbfbdb1517e0	inativo	\N	\N	\N	\N
rodrigo@gmail.com	Rodrigo	41998346823	96d23f0b311c9c9da7adb3d7395be0fd	ativo	\N	\N	\N	\N
rodrigo2@gmail.com	Rodrigo	41998346823	96d23f0b311c9c9da7adb3d7395be0fd	ativo	\N	\N	\N	\N
\.


--
-- TOC entry 3041 (class 0 OID 0)
-- Dependencies: 211
-- Name: detalhespedido_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalhespedido_id_seq', 13, true);


--
-- TOC entry 3042 (class 0 OID 0)
-- Dependencies: 203
-- Name: parcelapagamento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parcelapagamento_id_seq', 20, true);


--
-- TOC entry 3043 (class 0 OID 0)
-- Dependencies: 205
-- Name: pedido_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pedido_id_seq', 19, true);


--
-- TOC entry 3044 (class 0 OID 0)
-- Dependencies: 209
-- Name: produto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.produto_id_seq', 3, true);


--
-- TOC entry 2874 (class 2606 OID 16868)
-- Name: cupom cupom_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cupom
    ADD CONSTRAINT cupom_pk PRIMARY KEY (codigo);


--
-- TOC entry 2886 (class 2606 OID 16925)
-- Name: itempedido detalhespedido_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itempedido
    ADD CONSTRAINT detalhespedido_pk PRIMARY KEY (id);


--
-- TOC entry 2876 (class 2606 OID 16879)
-- Name: parcelapagamento parcelapagamento_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parcelapagamento
    ADD CONSTRAINT parcelapagamento_pk PRIMARY KEY (id);


--
-- TOC entry 2878 (class 2606 OID 16890)
-- Name: pedido pedido_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_pk PRIMARY KEY (id);


--
-- TOC entry 2884 (class 2606 OID 16917)
-- Name: produto produto_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto
    ADD CONSTRAINT produto_pk PRIMARY KEY (id);


--
-- TOC entry 2880 (class 2606 OID 16898)
-- Name: usocupom usocupom_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usocupom
    ADD CONSTRAINT usocupom_pk PRIMARY KEY ("cupomCodigo", "usuarioEmail");


--
-- TOC entry 2882 (class 2606 OID 16906)
-- Name: usuario usuario_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pk PRIMARY KEY (email);


--
-- TOC entry 2892 (class 2606 OID 16951)
-- Name: itempedido detalhespedido_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itempedido
    ADD CONSTRAINT detalhespedido_fk FOREIGN KEY ("pedidoId") REFERENCES public.pedido(id);


--
-- TOC entry 2893 (class 2606 OID 16956)
-- Name: itempedido detalhespedido_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itempedido
    ADD CONSTRAINT detalhespedido_fk_1 FOREIGN KEY ("produtoId") REFERENCES public.produto(id);


--
-- TOC entry 2887 (class 2606 OID 16946)
-- Name: parcelapagamento parcelapagamento_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parcelapagamento
    ADD CONSTRAINT parcelapagamento_fk FOREIGN KEY ("pedidoId") REFERENCES public.pedido(id);


--
-- TOC entry 2888 (class 2606 OID 16926)
-- Name: pedido pedido_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_fk FOREIGN KEY ("usuarioEmail") REFERENCES public.usuario(email);


--
-- TOC entry 2889 (class 2606 OID 16931)
-- Name: pedido pedido_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_fk_1 FOREIGN KEY ("cupomCodigo") REFERENCES public.cupom(codigo);


--
-- TOC entry 2890 (class 2606 OID 16936)
-- Name: usocupom usocupom_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usocupom
    ADD CONSTRAINT usocupom_fk FOREIGN KEY ("usuarioEmail") REFERENCES public.usuario(email);


--
-- TOC entry 2891 (class 2606 OID 16941)
-- Name: usocupom usocupom_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usocupom
    ADD CONSTRAINT usocupom_fk_1 FOREIGN KEY ("cupomCodigo") REFERENCES public.cupom(codigo);


-- Completed on 2021-11-13 18:50:02

--
-- PostgreSQL database dump complete
--

