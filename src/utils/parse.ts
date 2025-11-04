import type { ProjectRecord, GCFInfo, CarbonInfo } from '../types/project';

// parse.ts 전용 프로젝트 타입 (레거시)
interface ParsedProject {
  id: string;
  source: 'GCF' | 'CarbonPlan';
  name: string;
  developer: string;
  theme: string;
  primaryDate: Date | null;
  dateType: string;
  gcf?: GCFInfo;
  carbon?: CarbonInfo;
}

// JSON 문자열 파싱 (안전)
function parseJSON<T>(str: string | null): T | null {
  if (!str) return null;
  try {
    return JSON.parse(str) as T;
  } catch {
    return null;
  }
}

// 배열 문자열 파싱 (['vm0009'] 형식)
function parseArrayString(str: string | null): string[] {
  if (!str) return [];
  
  // 이미 배열인 경우
  const parsed = parseJSON<string[]>(str);
  if (Array.isArray(parsed)) return parsed;
  
  // 콤마로 구분된 문자열인 경우
  if (str.includes(',')) {
    return str.split(',').map((s) => s.trim());
  }
  
  return [str];
}

// 국가 문자열 파싱
function parseCountries(str: string | null): string[] {
  if (!str) return [];
  
  // 콤마로 구분된 경우
  if (str.includes(',')) {
    return str.split(',').map((s) => s.trim());
  }
  
  return [str];
}

// 날짜 문자열을 Date 객체로 변환
function parseDate(str: string | null): Date | null {
  if (!str) return null;
  try {
    const date = new Date(str);
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

// DB 레코드를 프론트엔드 프로젝트 모델로 변환
export function transformProject(record: ProjectRecord): ParsedProject {
  const project: ParsedProject = {
    id: record.project_ref_id,
    source: record.source,
    name: record.project_name,
    developer: record.developer_proponent || '',
    theme: record.gcf_theme || '',
    primaryDate: parseDate(record.primary_date),
    dateType: record.date_type || '',
  };

  // GCF 데이터가 있는 경우
  if (
    record.source === 'GCF' &&
    (record.gcf_status ||
      record.gcf_modality ||
      record.gcf_countries ||
      record.gcf_bm)
  ) {
    const gcf: GCFInfo = {
      status: record.gcf_status || '',
      modality: record.gcf_modality || '',
      countries: parseCountries(record.gcf_countries),
      boardMeeting: record.gcf_bm || '',
      projectSize: record.gcf_projectsize || 'Medium',
      essCategory: record.gcf_esscategory || '',
      faFinancing: record.gcf_fafinancing || 0,
      totalGcfFunding: record.gcf_totalgcffunding || 0,
      totalProjectValue: record.gcf_totalprojectvalue || 0,
    };
    project.gcf = gcf;
  }

  // CarbonPlan 데이터가 있는 경우
  if (
    record.source === 'CarbonPlan' &&
    (record.carbon_protocol ||
      record.carbon_registry ||
      record.credit_quantity)
  ) {
    const carbon: CarbonInfo = {
      protocol: parseArrayString(record.carbon_protocol),
      registry: record.carbon_registry || '',
      creditQuantity: record.credit_quantity || 0,
      firstTransactionDate: parseDate(record.cc_first_transaction_date) || new Date(),
      lastTransactionDate: parseDate(record.cc_last_transaction_date) || new Date(),
      vintageRange: record.cc_vintage_range || '',
    };
    project.carbon = carbon;
  }

  return project;
}

// 배치 변환
export function transformProjects(records: ProjectRecord[]): ParsedProject[] {
  return records.map(transformProject);
}

// CSV 행을 ProjectRecord로 파싱
export function parseCSVRow(row: Record<string, string>): ProjectRecord {
  return {
    source: row.source as 'GCF' | 'CarbonPlan',
    project_ref_id: row.project_ref_id,
    project_name: row.project_name,
    developer_proponent: row.developer_proponent || null,
    carbon_protocol: row.carbon_protocol || null,
    carbon_registry: row.carbon_registry || null,
    credit_quantity: row.credit_quantity ? Number(row.credit_quantity) : null,
    primary_date: row.primary_date || null,
    date_type: (row.date_type as 'Approval' | 'Listing') || null,
    gcf_status: row.gcf_status || null,
    gcf_modality: row.gcf_modality || null,
    gcf_countries: row.gcf_countries || null,
    gcf_bm: row.gcf_bm || null,
    gcf_theme: (row.gcf_theme as 'Adaptation' | 'Mitigation' | 'Cross-cutting') || null,
    gcf_projectsize: (row.gcf_projectsize as 'Small' | 'Medium' | 'Large') || null,
    gcf_esscategory: row.gcf_esscategory || null,
    gcf_fafinancing: row.gcf_fafinancing ? Number(row.gcf_fafinancing) : null,
    gcf_totalgcffunding: row.gcf_totalgcffunding ? Number(row.gcf_totalgcffunding) : null,
    gcf_totalprojectvalue: row.gcf_totalprojectvalue ? Number(row.gcf_totalprojectvalue) : null,
    cc_first_transaction_date: row.cc_first_transaction_date || null,
    cc_last_transaction_date: row.cc_last_transaction_date || null,
    cc_vintage_range: row.cc_vintage_range || null,
  };
}

