USE [master]
GO
/****** Object:  Database [UniversidadDB]    Script Date: 13/8/2023 14:13:21 ******/
CREATE DATABASE [UniversidadDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'UniversidadDB', FILENAME = N'C:\SQLData\UniversidadDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'UniversidadDB_log', FILENAME = N'C:\SQLData\UniversidadDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [UniversidadDB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [UniversidadDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [UniversidadDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [UniversidadDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [UniversidadDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [UniversidadDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [UniversidadDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [UniversidadDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [UniversidadDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [UniversidadDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [UniversidadDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [UniversidadDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [UniversidadDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [UniversidadDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [UniversidadDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [UniversidadDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [UniversidadDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [UniversidadDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [UniversidadDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [UniversidadDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [UniversidadDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [UniversidadDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [UniversidadDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [UniversidadDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [UniversidadDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [UniversidadDB] SET  MULTI_USER 
GO
ALTER DATABASE [UniversidadDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [UniversidadDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [UniversidadDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [UniversidadDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [UniversidadDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [UniversidadDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [UniversidadDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [UniversidadDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [UniversidadDB]
GO
/****** Object:  Table [dbo].[decano]    Script Date: 13/8/2023 14:13:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[decano](
	[idDecano] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NULL,
	[apellido] [varchar](50) NULL,
	[CI] [varchar](50) NULL,
	[idUsuario] [int] NULL,
 CONSTRAINT [PK_Decano] PRIMARY KEY CLUSTERED 
(
	[idDecano] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[estudiante]    Script Date: 13/8/2023 14:13:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[estudiante](
	[idEstudiante] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](150) NULL,
	[apellido] [varchar](50) NULL,
	[CI] [int] NULL,
	[idMalla] [int] NULL,
	[idUsuario] [int] NULL,
	[statusEstudiante] [varchar](255) NULL,
 CONSTRAINT [PK_Estudiante] PRIMARY KEY CLUSTERED 
(
	[idEstudiante] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[estudianteMateria]    Script Date: 13/8/2023 14:13:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[estudianteMateria](
	[idEstudianteMateria] [int] IDENTITY(1,1) NOT NULL,
	[idEstudiante] [int] NULL,
	[idMateria] [int] NULL,
	[status] [varchar](100) NULL,
 CONSTRAINT [PK_estudianteMateria] PRIMARY KEY CLUSTERED 
(
	[idEstudianteMateria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[estudianteReprobado]    Script Date: 13/8/2023 14:13:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[estudianteReprobado](
	[idEstudianteReprobado] [int] IDENTITY(1,1) NOT NULL,
	[idMateria] [int] NULL,
	[idEstudiante] [int] NULL,
	[promedio] [float] NULL,
 CONSTRAINT [PK_estudianteReprobado] PRIMARY KEY CLUSTERED 
(
	[idEstudianteReprobado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[malla]    Script Date: 13/8/2023 14:13:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[malla](
	[idMalla] [int] IDENTITY(1,1) NOT NULL,
	[nombreMalla] [varchar](150) NOT NULL,
	[idDecano] [int] NULL,
 CONSTRAINT [PK_malla] PRIMARY KEY CLUSTERED 
(
	[idMalla] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[materia]    Script Date: 13/8/2023 14:13:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[materia](
	[idMateria] [int] IDENTITY(1,1) NOT NULL,
	[nombreMateria] [varchar](50) NOT NULL,
	[idSemestre] [int] NULL,
	[codigo] [varchar](50) NULL,
	[horasTeoricas] [int] NULL,
	[horasPracticas] [int] NULL,
	[creditos] [int] NULL,
	[requisito] [varchar](50) NULL,
	[costo] [int] NULL,
 CONSTRAINT [PK_materia] PRIMARY KEY CLUSTERED 
(
	[idMateria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[materiaAprobada]    Script Date: 13/8/2023 14:13:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[materiaAprobada](
	[idMateriaAprobada] [int] IDENTITY(1,1) NOT NULL,
	[idEstudiante] [int] NULL,
	[idMateria] [int] NULL,
	[promedio] [float] NULL,
 CONSTRAINT [PK_materiaAprobada] PRIMARY KEY CLUSTERED 
(
	[idMateriaAprobada] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[materiaNota]    Script Date: 13/8/2023 14:13:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[materiaNota](
	[idMateriaNota] [int] IDENTITY(1,1) NOT NULL,
	[idNota] [int] NULL,
	[idMateria] [int] NULL,
	[idEstudiante] [int] NULL,
 CONSTRAINT [PK_materiaNota] PRIMARY KEY CLUSTERED 
(
	[idMateriaNota] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[nota]    Script Date: 13/8/2023 14:13:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[nota](
	[idNota] [int] IDENTITY(1,1) NOT NULL,
	[nota] [int] NULL,
	[nombreNota] [varchar](255) NULL,
 CONSTRAINT [PK_nota] PRIMARY KEY CLUSTERED 
(
	[idNota] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[semestre]    Script Date: 13/8/2023 14:13:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[semestre](
	[idSemestre] [int] IDENTITY(1,1) NOT NULL,
	[nombreSemestre] [varchar](50) NOT NULL,
	[idMalla] [int] NULL,
 CONSTRAINT [PK_semestre] PRIMARY KEY CLUSTERED 
(
	[idSemestre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuario]    Script Date: 13/8/2023 14:13:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuario](
	[idUsuario] [int] IDENTITY(1,1) NOT NULL,
	[usuario] [varchar](150) NULL,
	[password] [varchar](150) NULL,
	[email] [varchar](150) NULL,
	[rol] [varchar](50) NULL,
 CONSTRAINT [PK_usuario] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[decano] ON 

INSERT [dbo].[decano] ([idDecano], [nombre], [apellido], [CI], [idUsuario]) VALUES (1, N'admin', N'admin', N'123456789', 1)
SET IDENTITY_INSERT [dbo].[decano] OFF
GO
SET IDENTITY_INSERT [dbo].[estudiante] ON 

INSERT [dbo].[estudiante] ([idEstudiante], [nombre], [apellido], [CI], [idMalla], [idUsuario], [statusEstudiante]) VALUES (1, N'pablo', N'cortes', 9172909, 1, 2, N'activo')
SET IDENTITY_INSERT [dbo].[estudiante] OFF
GO
SET IDENTITY_INSERT [dbo].[estudianteMateria] ON 

INSERT [dbo].[estudianteMateria] ([idEstudianteMateria], [idEstudiante], [idMateria], [status]) VALUES (1, 1, 1, N'disponible')
INSERT [dbo].[estudianteMateria] ([idEstudianteMateria], [idEstudiante], [idMateria], [status]) VALUES (2, 1, 25, N'disponible')
INSERT [dbo].[estudianteMateria] ([idEstudianteMateria], [idEstudiante], [idMateria], [status]) VALUES (3, 1, 5, N'disponible')
INSERT [dbo].[estudianteMateria] ([idEstudianteMateria], [idEstudiante], [idMateria], [status]) VALUES (4, 1, 3, N'disponible')
INSERT [dbo].[estudianteMateria] ([idEstudianteMateria], [idEstudiante], [idMateria], [status]) VALUES (5, 1, 6, N'disponible')
INSERT [dbo].[estudianteMateria] ([idEstudianteMateria], [idEstudiante], [idMateria], [status]) VALUES (6, 1, 8, N'disponible')
INSERT [dbo].[estudianteMateria] ([idEstudianteMateria], [idEstudiante], [idMateria], [status]) VALUES (7, 1, 7, N'disponible')
INSERT [dbo].[estudianteMateria] ([idEstudianteMateria], [idEstudiante], [idMateria], [status]) VALUES (8, 1, 4, N'disponible')
INSERT [dbo].[estudianteMateria] ([idEstudianteMateria], [idEstudiante], [idMateria], [status]) VALUES (9, 1, 24, N'disponible')
INSERT [dbo].[estudianteMateria] ([idEstudianteMateria], [idEstudiante], [idMateria], [status]) VALUES (10, 1, 10, N'disponible')
INSERT [dbo].[estudianteMateria] ([idEstudianteMateria], [idEstudiante], [idMateria], [status]) VALUES (11, 1, 16, N'disponible')
INSERT [dbo].[estudianteMateria] ([idEstudianteMateria], [idEstudiante], [idMateria], [status]) VALUES (12, 1, 2, N'disponible')
INSERT [dbo].[estudianteMateria] ([idEstudianteMateria], [idEstudiante], [idMateria], [status]) VALUES (13, 1, 48, N'disponible')
INSERT [dbo].[estudianteMateria] ([idEstudianteMateria], [idEstudiante], [idMateria], [status]) VALUES (14, 1, 19, N'disponible')
INSERT [dbo].[estudianteMateria] ([idEstudianteMateria], [idEstudiante], [idMateria], [status]) VALUES (15, 1, 11, N'disponible')
INSERT [dbo].[estudianteMateria] ([idEstudianteMateria], [idEstudiante], [idMateria], [status]) VALUES (16, 1, 13, N'disponible')
SET IDENTITY_INSERT [dbo].[estudianteMateria] OFF
GO
SET IDENTITY_INSERT [dbo].[malla] ON 

INSERT [dbo].[malla] ([idMalla], [nombreMalla], [idDecano]) VALUES (1, N'INGENIERIA DE SISTEMAS', 1)
INSERT [dbo].[malla] ([idMalla], [nombreMalla], [idDecano]) VALUES (2, N'INGENIERIA EN MECANICA AUTOMOTRIZ', 1)
SET IDENTITY_INSERT [dbo].[malla] OFF
GO
SET IDENTITY_INSERT [dbo].[materia] ON 

INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (1, N'METODOS Y TECNICAS DE ESTUDIO', 1, N'MTE-161', 40, 20, 3, N'', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (2, N'IDIOMA I', 1, N'IDI-162', 40, 20, 3, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (3, N'ALJEBRA SUPERIOR', 1, N'ALS-133', 80, 40, 6, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (4, N'CALCULO I', 1, N'CAL-114', 80, 40, 6, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (5, N'INFORMATICA I', 1, N'INF-145', 60, 40, 5, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (6, N'ADMINISTRACION I', 1, N'ADM-226', 80, 40, 6, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (7, N'FISICA I', 1, N'FIS-117', 60, 40, 5, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (8, N'DERECHO EMPRESARIAL', 2, N'DER-361', 80, 20, 5, N'', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (9, N'IDIOMA II', 2, N'IDI-262', 40, 20, 3, N'IDI-162', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (10, N'CONTABILIDAD BASICA', 2, N'CBA-233', 80, 40, 6, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (11, N'SISTEMAS OPERATIVOS', 2, N'SOP-144', 60, 40, 6, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (12, N'CALCULO II', 2, N'CAL-215', 80, 40, 6, N'CAL-114', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (13, N'MICROECONOMIA', 2, N'MIC-426', 60, 40, 5, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (14, N'ALGEBRA LINEAL', 3, N'ALL-211', 80, 40, 6, N'ALS-113', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (15, N'ECUACIONES DIFERENCIALES', 3, N'ECD-342', 80, 40, 6, N'CAL-214', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (16, N'ESTADISTICA I', 3, N'EST-343', 60, 20, 4, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (17, N'FINANZAS I', 3, N'FIN-324', 60, 20, 4, N'CBA-233', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (18, N'PROGRAMACION I', 3, N'PRO-245', 80, 40, 6, N'INF-145', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (19, N'SISTEMAS DE INFORMACION I', 3, N'SDI-346', 60, 20, 4, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (20, N'ARQUITECTURA DE COMPUTADORAS', 3, N'ADC-347', 60, 20, 4, N'SOP-144', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (21, N'ESTADISTICA II', 4, N'EST-441', 60, 40, 5, N'EST-342', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (22, N'MICROPROCESADORES', 4, N'MIP-442', 80, 40, 6, N'ADC-346', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (23, N'PROGRAMACION II', 4, N'PRO-343', 60, 20, 4, N'PRO-245', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (24, N'TECNOLOGIA WEB', 4, N'TEW-444', 80, 40, 6, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (25, N'GESTION ESTRATEGICA', 4, N'GES-435', 80, 20, 5, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (26, N'ESTRUCTURA DE DATOS', 4, N'EDD-446', 80, 40, 6, N'SDI-346', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (27, N'ANALISIS DE SISTEMAS I', 5, N'ADS-451', 80, 40, 6, N'EDD-446', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (28, N'BASE DE DATOS I', 5, N'BDD-542', 80, 40, 6, N'TEW-444', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (29, N'OPERACIONES Y LOGISTICA I', 5, N'OYL-544', 60, 20, 4, N'MIP-442', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (30, N'SIMULACION Y MODELAJE', 5, N'SYM-545', 60, 40, 5, N'EDD-446', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (31, N'INVESTIGACION OPERATIVA I', 5, N'IOP-536', 80, 40, 6, N'MIC-426', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (32, N'INGENIERIA DE SOFTWARE', 6, N'ISW-641', 60, 20, 4, N'ADS-541', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (33, N'BASE DE DATOS II', 6, N'BDD-642', 60, 20, 4, N'BDD-542', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (34, N'REDES II', 6, N'RED-643', 60, 20, 4, N'RED-543', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (35, N'REDES I', 5, N'RED-543', 80, 40, 6, N'TEW-444', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (36, N'OPERACIONES Y LOGISTICA II', 6, N'OYL-644', 60, 20, 4, N'OYL-544', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (37, N'TEORIA DE AUTOMATAS Y LEGUNAJES FORMALES', 6, N'TDA-645', 60, 20, 4, N'SYM-545', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (38, N'INVESTIGACION OPERATIVA II', 6, N'IOP-636', 60, 20, 4, N'IOP-536', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (39, N'PRACTICA EMPRESARIAL', 6, N'PEM-637', 20, 180, 10, N'EDD-446', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (40, N'ORGANIZACION Y METODOS', 7, N'OYM-731', 60, 40, 5, N'OYL-644', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (41, N'ROBOTICA', 7, N'ROB-742', 80, 40, 6, N'TDA-645', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (42, N'CRIPTOGRAFIA Y SEGURIDAD', 7, N'CYS-743', 60, 40, 5, N'BDD-642', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (43, N'INTELIGENCIA ARTIFICIAL', 7, N'IAR-744', 60, 20, 4, N'IOP-636', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (44, N'GERENCIA DE CALIDAD TOTAL', 7, N'GDC-745', 20, 80, 4, N'ISW-641', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (45, N'REDES NEURONALES', 7, N'RNE-746', 60, 20, 4, N'RED-643', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (46, N'TALLER DE GRADO', 7, N'TGR-767', 80, 40, 4, N'PEM-637', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (47, N'SISTEMAS DE TIEMPO REAL', 8, N'STR-841', 60, 20, 4, N'CYS-743', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (48, N'COMERCIO ELECTRONICO', 8, N'CEL-842', 60, 20, 4, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (49, N'AUDITORIA Y SEGURIDAD DE SISTEMAS', 8, N'ASS-843', 60, 20, 4, N'GDC-745', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (50, N'SISTEMAS EXPERTOS EN GESTION', 8, N'SEG-844', 60, 20, 4, N'ROB-742', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (51, N'TECNOLOGIAS EMEREGENTES', 8, N'TEM-845', 60, 20, 4, N'IAR-744', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (52, N'SEMINARIO DE GRADO', 8, N'SGR-866', 80, 200, 14, N'TGR-767', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (53, N'METODOS Y TECNICAS DE ESTUDIO', 9, N'MTE-161', 40, 20, 3, N'', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (54, N'IDIOMA I', 9, N'IDI-162', 40, 20, 4, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (55, N'INFORMATICA', 9, N'INF-113', 60, 20, 4, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (56, N'MATEMATICA', 9, N'MAT-114', 80, 40, 6, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (57, N'METROLOGIA', 9, N'MET-115', 80, 40, 6, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (58, N'FISICA I', 9, N'FIS-116', 80, 20, 5, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (59, N'MOTORES A GASOLINA I', 9, N'MGA-117', 80, 40, 6, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (60, N'DERECHO EMPRESARIAL', 10, N'DER-367', 40, 20, 3, N'', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (61, N'IDIOMA II', 10, N'IDI-262', 40, 20, 3, N'IDI-162', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (62, N'ELECTRICIDAD AUTOMOTRIZ I', 10, N'EAU-213', 80, 40, 6, N'', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (63, N'CALCULO I', 10, N'CAL-214', 80, 40, 6, N'MAT-114', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (64, N'MOTORES A GASOLINA II', 10, N'MGA-215', 80, 20, 5, N'MGA-117', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (65, N'DIBUJO TECNICO DE MAQUINAS', 10, N'DTM-216', 80, 20, 5, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (66, N'FISICA II', 10, N'FIS-217', 80, 20, 5, N'FIS-116', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (67, N'TERMODINAMICA I', 11, N'TER-311', 80, 20, 5, N'', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (68, N'MECANICA DE FLUIDOS', 11, N'MFL-312', 80, 20, 5, N'FIS-212', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (69, N'QUIMICA AUTOMOTRIZ', 11, N'QAU-313', 80, 20, 5, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (70, N'ELECTRICIDAD AUTOMOTRIZ II', 11, N'EAU-314', 80, 40, 6, N'EAU-213', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (71, N'CALCULO APLICADO', 11, N'CAP-315', 80, 40, 6, N'CAL-214', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (72, N'DIBUJO COMPUTARIZADO', 11, N'DCO-316', 80, 40, 6, N'DTM-216', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (73, N'TERMODINAMICA II', 12, N'TER-411', 80, 20, 5, N'TER-311', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (74, N'MOTORES DIESEL I', 12, N'MDI-412', 80, 40, 6, N'MGA-215', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (75, N'RESISTENCIA DE MATERIALES', 12, N'RMA-413', 80, 20, 5, N'CAP-315', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (76, N'SISTEMAS DEL AUTOMOVIL I', 12, N'SAU-414', 80, 40, 6, N'MGA-215', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (77, N'METALURGIA I', 12, N'MET-415', 80, 20, 5, N'QAU-313', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (78, N'TRANSFORMACIONES MECANICAS', 12, N'TME-416', 80, 40, 6, N'MET-115', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (79, N'MANTENIMIENTO AUTOMOTRIZ', 13, N'MAU-511', 80, 40, 6, N'MDI-412', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (80, N'METALURGIA II', 13, N'MET-512', 80, 20, 5, N'MET-415', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (81, N'MOTORES DIESEL II', 13, N'MDI-513', 80, 40, 6, N'MDI-412', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (82, N'REPARACION DE AUTOMOTRES', 13, N'RAU-514', 80, 40, 6, N'MDI-412', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (83, N'SISTEMAS DEL AUTOMOVIL II', 13, N'SAU-515', 80, 40, 6, N'SAU-414', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (84, N'CONTABILIDAD DE COSTOS', 13, N'CCO-336', 60, 20, 4, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (85, N'MACANICAS HIDRAULICAS Y DE FLUIDOS', 14, N'MHF-611', 60, 20, 4, N'MFL-312', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (86, N'INGENIERIA AUTOMOTRIZ (DISEÑO DE AUTOPARTES)', 14, N'IAU-612', 60, 20, 4, N'DCO-316', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (87, N'ELECTRONICA I', 14, N'ELE-619', 60, 20, 4, N'EAU-314', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (88, N'MAQUINARIA PESADA Y AGRICOLA', 14, N'MPA-614', 60, 20, 4, N'MDI-513', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (89, N'INGENIERIA DE CONTROL', 14, N'ICO-615', 60, 20, 4, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (90, N'ELEMENTOS DE MAQUINAS', 14, N'EMA-616', 40, 20, 3, N'TME-416', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (91, N'PRACTICA EMPRESARIAL', 14, N'PEM-637', 20, 180, 10, N'TME-416', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (92, N'INYECCION ELECTRONICA', 15, N'IEL-711', 80, 20, 5, N'MGA-215', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (93, N'INGENIERIA DE PLANTA', 15, N'IPL-712', 60, 20, 4, N'ICO-615', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (94, N'INGENIERIA AUTOMOTRIZ II (DISEÑO DE AUTOPARTES)', 15, N'IAU-713', 60, 20, 4, N'IAU-612', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (95, N'ELECTRONICA II', 15, N'ELE-714', 60, 20, 4, N'ELE-613', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (96, N'INVESTIGACION DE OPERACIONES', 15, N'IOP-735', 40, 40, 4, N'CAP-315', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (97, N'MANTENIMIENTO CORRECTIVO DE CARROCERIAS', 15, N'MCC-716', 80, 40, 6, N'MAU-511', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (98, N'TALLER DE GRADO', 15, N'TGR-767', 80, 40, 6, N'PEM-637', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (99, N'CONTROL DE CALIDAD', 16, N'CCA-811', 40, 20, 3, N'', 775)
GO
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (100, N'MANTENIMIENTO DE EQUIPOS', 16, N'MEQ-812', 40, 20, 3, N'MCC-716', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (101, N'ADMINISTRACION DE LA PRODUCION', 16, N'APR-813', 40, 20, 3, N'IOP-735', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (102, N'INGENIERIA AUTOMOTRIZ III', 16, N'IAU-814', 80, 20, 5, N'IAU-713', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (103, N'ROBOTICA', 16, N'ROB-815', 40, 20, 3, N'ELE-714', 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (104, N'SEGURIDAD INDUSTRIAL', 16, N'SIN-816', 40, 20, 3, NULL, 775)
INSERT [dbo].[materia] ([idMateria], [nombreMateria], [idSemestre], [codigo], [horasTeoricas], [horasPracticas], [creditos], [requisito], [costo]) VALUES (105, N'SEMINARIO DE GRADO', 16, N'SGR-866', 80, 200, 14, N'TGR-767', 775)
SET IDENTITY_INSERT [dbo].[materia] OFF
GO
SET IDENTITY_INSERT [dbo].[semestre] ON 

INSERT [dbo].[semestre] ([idSemestre], [nombreSemestre], [idMalla]) VALUES (1, N'Primer Semestre', 1)
INSERT [dbo].[semestre] ([idSemestre], [nombreSemestre], [idMalla]) VALUES (2, N'Segundo Semestre', 1)
INSERT [dbo].[semestre] ([idSemestre], [nombreSemestre], [idMalla]) VALUES (3, N'Tercer Semestre', 1)
INSERT [dbo].[semestre] ([idSemestre], [nombreSemestre], [idMalla]) VALUES (4, N'Cuarto Semestre', 1)
INSERT [dbo].[semestre] ([idSemestre], [nombreSemestre], [idMalla]) VALUES (5, N'Quinto Semestre', 1)
INSERT [dbo].[semestre] ([idSemestre], [nombreSemestre], [idMalla]) VALUES (6, N'Sexto Semestre', 1)
INSERT [dbo].[semestre] ([idSemestre], [nombreSemestre], [idMalla]) VALUES (7, N'Septimo Semestre', 1)
INSERT [dbo].[semestre] ([idSemestre], [nombreSemestre], [idMalla]) VALUES (8, N'Octavo Semestre', 1)
INSERT [dbo].[semestre] ([idSemestre], [nombreSemestre], [idMalla]) VALUES (9, N'Primer Semestre', 2)
INSERT [dbo].[semestre] ([idSemestre], [nombreSemestre], [idMalla]) VALUES (10, N'Segundo Semestre', 2)
INSERT [dbo].[semestre] ([idSemestre], [nombreSemestre], [idMalla]) VALUES (11, N'Tercer Semestre', 2)
INSERT [dbo].[semestre] ([idSemestre], [nombreSemestre], [idMalla]) VALUES (12, N'Cuarto Semestre', 2)
INSERT [dbo].[semestre] ([idSemestre], [nombreSemestre], [idMalla]) VALUES (13, N'Quinto Semestre', 2)
INSERT [dbo].[semestre] ([idSemestre], [nombreSemestre], [idMalla]) VALUES (14, N'Sexto Semestre', 2)
INSERT [dbo].[semestre] ([idSemestre], [nombreSemestre], [idMalla]) VALUES (15, N'Septimo Semestre', 2)
INSERT [dbo].[semestre] ([idSemestre], [nombreSemestre], [idMalla]) VALUES (16, N'Octavo Semestre', 2)
SET IDENTITY_INSERT [dbo].[semestre] OFF
GO
SET IDENTITY_INSERT [dbo].[usuario] ON 

INSERT [dbo].[usuario] ([idUsuario], [usuario], [password], [email], [rol]) VALUES (1, N'admin', N'123456', N'admin@hotmail.com', N'admin')
INSERT [dbo].[usuario] ([idUsuario], [usuario], [password], [email], [rol]) VALUES (2, N'pablo', N'123456', N'pablo@hotmail.com', N'usuario')
SET IDENTITY_INSERT [dbo].[usuario] OFF
GO
ALTER TABLE [dbo].[decano]  WITH CHECK ADD  CONSTRAINT [FK_decano_usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[decano] CHECK CONSTRAINT [FK_decano_usuario]
GO
ALTER TABLE [dbo].[estudiante]  WITH CHECK ADD  CONSTRAINT [FK_estudiante_malla] FOREIGN KEY([idMalla])
REFERENCES [dbo].[malla] ([idMalla])
GO
ALTER TABLE [dbo].[estudiante] CHECK CONSTRAINT [FK_estudiante_malla]
GO
ALTER TABLE [dbo].[estudiante]  WITH CHECK ADD  CONSTRAINT [FK_estudiante_usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[estudiante] CHECK CONSTRAINT [FK_estudiante_usuario]
GO
ALTER TABLE [dbo].[estudianteMateria]  WITH CHECK ADD  CONSTRAINT [FK_estudianteMateria_estudiante] FOREIGN KEY([idEstudiante])
REFERENCES [dbo].[estudiante] ([idEstudiante])
GO
ALTER TABLE [dbo].[estudianteMateria] CHECK CONSTRAINT [FK_estudianteMateria_estudiante]
GO
ALTER TABLE [dbo].[estudianteMateria]  WITH CHECK ADD  CONSTRAINT [FK_estudianteMateria_materia] FOREIGN KEY([idMateria])
REFERENCES [dbo].[materia] ([idMateria])
GO
ALTER TABLE [dbo].[estudianteMateria] CHECK CONSTRAINT [FK_estudianteMateria_materia]
GO
ALTER TABLE [dbo].[estudianteReprobado]  WITH CHECK ADD  CONSTRAINT [FK_estudianteReprobado_estudiante] FOREIGN KEY([idEstudiante])
REFERENCES [dbo].[estudiante] ([idEstudiante])
GO
ALTER TABLE [dbo].[estudianteReprobado] CHECK CONSTRAINT [FK_estudianteReprobado_estudiante]
GO
ALTER TABLE [dbo].[estudianteReprobado]  WITH CHECK ADD  CONSTRAINT [FK_estudianteReprobado_materia] FOREIGN KEY([idMateria])
REFERENCES [dbo].[materia] ([idMateria])
GO
ALTER TABLE [dbo].[estudianteReprobado] CHECK CONSTRAINT [FK_estudianteReprobado_materia]
GO
ALTER TABLE [dbo].[malla]  WITH CHECK ADD  CONSTRAINT [FK_malla_decano] FOREIGN KEY([idDecano])
REFERENCES [dbo].[decano] ([idDecano])
GO
ALTER TABLE [dbo].[malla] CHECK CONSTRAINT [FK_malla_decano]
GO
ALTER TABLE [dbo].[materia]  WITH CHECK ADD  CONSTRAINT [FK_materia_semestre] FOREIGN KEY([idSemestre])
REFERENCES [dbo].[semestre] ([idSemestre])
GO
ALTER TABLE [dbo].[materia] CHECK CONSTRAINT [FK_materia_semestre]
GO
ALTER TABLE [dbo].[materiaAprobada]  WITH CHECK ADD  CONSTRAINT [FK_materiaAprobada_estudiante] FOREIGN KEY([idEstudiante])
REFERENCES [dbo].[estudiante] ([idEstudiante])
GO
ALTER TABLE [dbo].[materiaAprobada] CHECK CONSTRAINT [FK_materiaAprobada_estudiante]
GO
ALTER TABLE [dbo].[materiaAprobada]  WITH CHECK ADD  CONSTRAINT [FK_materiaAprobada_materia] FOREIGN KEY([idMateria])
REFERENCES [dbo].[materia] ([idMateria])
GO
ALTER TABLE [dbo].[materiaAprobada] CHECK CONSTRAINT [FK_materiaAprobada_materia]
GO
ALTER TABLE [dbo].[materiaNota]  WITH CHECK ADD  CONSTRAINT [FK_materiaNota_materia] FOREIGN KEY([idMateria])
REFERENCES [dbo].[materia] ([idMateria])
GO
ALTER TABLE [dbo].[materiaNota] CHECK CONSTRAINT [FK_materiaNota_materia]
GO
ALTER TABLE [dbo].[materiaNota]  WITH CHECK ADD  CONSTRAINT [FK_materiaNota_nota] FOREIGN KEY([idNota])
REFERENCES [dbo].[nota] ([idNota])
GO
ALTER TABLE [dbo].[materiaNota] CHECK CONSTRAINT [FK_materiaNota_nota]
GO
ALTER TABLE [dbo].[semestre]  WITH CHECK ADD  CONSTRAINT [FK_semestre_malla] FOREIGN KEY([idMalla])
REFERENCES [dbo].[malla] ([idMalla])
GO
ALTER TABLE [dbo].[semestre] CHECK CONSTRAINT [FK_semestre_malla]
GO
USE [master]
GO
ALTER DATABASE [UniversidadDB] SET  READ_WRITE 
GO
