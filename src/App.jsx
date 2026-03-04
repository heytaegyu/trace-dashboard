import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";

const kpiData = [
  { week: "1월4주", 순판매량: 213, 기여이익: 701279,  판매이익: 1071114, 재고량: 5611, 리뷰: 16  },
  { week: "2월1주", 순판매량: 389, 기여이익: 735555,  판매이익: 1363790, 재고량: 5167, 리뷰: 0   },
  { week: "2월2주", 순판매량: 203, 기여이익: 406172,  판매이익: 734017,  재고량: 5050, 리뷰: 0   },
  { week: "2월3주", 순판매량: 58,  기여이익: 461051,  판매이익: 764671,  재고량: 4779, 리뷰: 130 },
  { week: "2월4주", 순판매량: 182, 기여이익: 614862,  판매이익: 1014312, 재고량: 4612, 리뷰: 48  },
];

const avg = (key) => Math.round(kpiData.reduce((s, d) => s + d[key], 0) / kpiData.length);
const avgSales  = avg("순판매량");
const avgProfit = avg("판매이익");
const monthlyEst = avgProfit * 4;
const TARGET = 20000000;
const pct = Math.round((monthlyEst / TARGET) * 100);
const gap = TARGET - monthlyEst;
const unitProfit = avgProfit / avgSales;
const neededWeekly = Math.round((TARGET / 4) / unitProfit);

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useState(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  });
  return isMobile;
}

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 14px", boxShadow: "0 4px 12px #00000018" }}>
      <p style={{ color: "#9ca3af", fontSize: 11, margin: "0 0 4px" }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 13, fontWeight: 700, margin: 0 }}>
          {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  );
};

const Card = ({ label, value, sub, color }) => (
  <div style={{ background: "#fff", borderRadius: 14, padding: "20px 18px", borderTop: `3px solid ${color}`, boxShadow: "0 1px 4px #00000010", border: `1px solid #e5e7eb`, borderTopColor: color }}>
    <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 10, lineHeight: 1.4 }}>{label}</div>
    <div style={{ fontSize: 28, fontWeight: 900, color: "#111827", lineHeight: 1 }}>{value}</div>
    {sub && <div style={{ color: "#6b7280", fontSize: 12, marginTop: 10, lineHeight: 1.6 }}>{sub}</div>}
  </div>
);

export default function App() {
  const [tab, setTab] = useState("현황");
  const isMobile = useIsMobile();
  return (
    <div style={{ fontFamily: "'Apple SD Gothic Neo','Malgun Gothic',sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: isMobile ? "16px 20px 0" : "20px 32px 0" }}>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", gap: isMobile ? 10 : 0 }}>
          <div>
            <div style={{ fontSize: 11, color: "#9ca3af", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Trace Corp · 멜라체리</div>
            <h1 style={{ fontSize: isMobile ? 18 : 20, fontWeight: 800, margin: 0, color: "#0f172a" }}>2026 WBR 대시보드</h1>
          </div>
          <div style={{ textAlign: isMobile ? "left" : "right", paddingBottom: isMobile ? 0 : 4 }}>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>목표 · 3/2 기준</div>
            <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 800, color: "#f59e0b" }}>월 순이익 2,000만원</div>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 14 }}>
          {["현황","판매추이","전략"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: isMobile ? "10px 18px" : "10px 22px", fontSize: isMobile ? 14 : 13, fontWeight: tab===t?700:400, background: "none", border: "none", borderBottom: tab===t?"2px solid #2563eb":"2px solid transparent", color: tab===t?"#2563eb":"#6b7280", cursor: "pointer" }}>{t}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: isMobile ? "20px 16px" : "28px 32px", maxWidth: 900, margin: "0 auto" }}>
        {tab==="현황" && (
          <div>
            <div style={{ background:"#fff", borderRadius:14, padding: isMobile?"20px 18px":"24px 28px", marginBottom:20, border:"1px solid #e5e7eb" }}>
              <div style={{ display:"flex", flexDirection: isMobile?"column":"row", justifyContent:"space-between", alignItems:"flex-start", gap: isMobile?16:0, marginBottom:16 }}>
                <div>
                  <div style={{ fontSize:12, color:"#9ca3af", marginBottom:8 }}>월 순이익 목표 달성률</div>
                  <div style={{ display:"flex", alignItems:"baseline", gap:12 }}>
                    <span style={{ fontSize: isMobile?48:42, fontWeight:900, color:"#f59e0b", lineHeight:1 }}>{pct}%</span>
                    <span style={{ fontSize: isMobile?15:14, color:"#9ca3af" }}>{(monthlyEst/10000).toFixed(0)}만원 / 2,000만원</span>
                  </div>
                </div>
                <div style={{ background:"#fef2f2", borderRadius:12, padding: isMobile?"14px 20px":"12px 18px", textAlign:"center", width: isMobile?"100%":"auto", boxSizing:"border-box" }}>
                  <div style={{ fontSize:12, color:"#9ca3af", marginBottom:6 }}>목표까지 부족</div>
                  <div style={{ fontSize: isMobile?28:22, fontWeight:900, color:"#ef4444" }}>-{(gap/10000).toFixed(0)}만원</div>
                  <div style={{ fontSize:12, color:"#9ca3af", marginTop:6 }}>현재의 {(TARGET/monthlyEst).toFixed(1)}배 성장 필요</div>
                </div>
              </div>
              <div style={{ background:"#f1f5f9", borderRadius:999, height:12, overflow:"hidden" }}>
                <div style={{ background:"linear-gradient(90deg,#f59e0b,#fbbf24)", height:"100%", width:`${pct}%`, borderRadius:999 }} />
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:8 }}>
                <span style={{ fontSize:11, color:"#9ca3af" }}>0</span>
                <span style={{ fontSize:11, color:"#f59e0b", fontWeight:700 }}>현재 {pct}%</span>
                <span style={{ fontSize:11, color:"#9ca3af" }}>2,000만원</span>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns: isMobile?"repeat(2,1fr)":"repeat(4,1fr)", gap: isMobile?12:14, marginBottom:20 }}>
              <Card label="현재 재고" value="4,612개" sub={"약 25주치\n소진 예상"} color="#3b82f6" />
              <Card label="주간 평균 판매량" value={`${avgSales}개`} sub={`최고: 389개\n(2월1주)`} color="#10b981" />
              <Card label="주간 평균 판매이익" value={`${(avgProfit/10000).toFixed(0)}만원`} sub={`월 환산\n${(monthlyEst/10000).toFixed(0)}만원`} color="#8b5cf6" />
              <Card label="목표 달성 필요 판매량" value={`주 ${neededWeekly}개`} sub={`현재 대비\n${(neededWeekly/avgSales).toFixed(1)}배`} color="#f59e0b" />
            </div>
            <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:16 }}>
              <div style={{ background:"#fff", borderRadius:12, padding:"20px 16px", border:"1px solid #e5e7eb" }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#374151", marginBottom:4 }}>주간 순판매량</div>
                <div style={{ fontSize:11, color:"#9ca3af", marginBottom:14 }}>— 평균 {avgSales}개 기준선</div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={kpiData} barSize={28}>
                    <XAxis dataKey="week" tick={{ fill:"#9ca3af", fontSize:10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill:"#9ca3af", fontSize:10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<Tip />} />
                    <ReferenceLine y={avgSales} stroke="#f59e0b" strokeDasharray="4 2" />
                    <Bar dataKey="순판매량" radius={[4,4,0,0]} name="순판매량">
                      {kpiData.map((d,i) => <Cell key={i} fill={d.순판매량>=avgSales?"#3b82f6":"#bfdbfe"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ background:"#fff", borderRadius:12, padding:"20px 16px", border:"1px solid #e5e7eb" }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#374151", marginBottom:4 }}>주간 판매이익</div>
                <div style={{ fontSize:11, color:"#9ca3af", marginBottom:14 }}>— 주간 목표선 500만원</div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={kpiData}>
                    <XAxis dataKey="week" tick={{ fill:"#9ca3af", fontSize:10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill:"#9ca3af", fontSize:10 }} axisLine={false} tickLine={false} tickFormatter={v=>(v/10000).toFixed(0)+"만"} />
                    <Tooltip content={<Tip />} />
                    <ReferenceLine y={5000000} stroke="#f59e0b" strokeDasharray="4 2" />
                    <Line dataKey="판매이익" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill:"#8b5cf6", r:4, strokeWidth:0 }} name="판매이익" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
        {tab==="판매추이" && (
          <div>
            {isMobile ? (
              <div style={{ marginBottom:20 }}>
                {kpiData.map((r,i) => (
                  <div key={i} style={{ background:"#fff", borderRadius:14, padding:"18px", marginBottom:12, border:"1px solid #e5e7eb" }}>
                    <div style={{ fontSize:15, fontWeight:800, color:"#2563eb", marginBottom:14 }}>{r.week}</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px 16px" }}>
                      {[
                        { label:"순판매량", value:`${r.순판매량}개`, color: r.순판매량>=avgSales?"#10b981":"#374151" },
                        { label:"기여이익", value:`${(r.기여이익/10000).toFixed(1)}만`, color:"#374151" },
                        { label:"판매이익", value:`${(r.판매이익/10000).toFixed(1)}만`, color:"#8b5cf6" },
                        { label:"재고량",   value:`${r.재고량.toLocaleString()}개`, color:"#6b7280" },
                        { label:"리뷰체험단", value: r.리뷰>0?`${r.리뷰}개`:"–", color: r.리뷰>0?"#f59e0b":"#d1d5db" },
                      ].map(({ label, value, color }) => (
                        <div key={label}>
                          <div style={{ fontSize:11, color:"#9ca3af", marginBottom:3 }}>{label}</div>
                          <div style={{ fontSize:16, fontWeight:700, color }}>{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background:"#fff", borderRadius:12, overflow:"hidden", border:"1px solid #e5e7eb", marginBottom:20 }}>
                <div style={{ padding:"16px 20px", borderBottom:"1px solid #f1f5f9" }}>
                  <div style={{ fontSize:14, fontWeight:700, color:"#0f172a" }}>주간 지표 상세</div>
                </div>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                  <thead>
                    <tr style={{ background:"#f8fafc" }}>
                      {["주차","순판매량","기여이익","판매이익","재고량","리뷰체험단"].map(h => (
                        <th key={h} style={{ padding:"10px 18px", color:"#6b7280", fontWeight:600, textAlign: h==="주차"?"left":"right", fontSize:12, borderBottom:"1px solid #e5e7eb" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {kpiData.map((r,i) => (
                      <tr key={i} style={{ borderBottom:"1px solid #f8fafc" }}>
                        <td style={{ padding:"13px 18px", fontWeight:700, color:"#2563eb" }}>{r.week}</td>
                        <td style={{ padding:"13px 18px", textAlign:"right", fontWeight:700, color: r.순판매량>=avgSales?"#10b981":"#374151" }}>{r.순판매량}개</td>
                        <td style={{ padding:"13px 18px", textAlign:"right" }}>{(r.기여이익/10000).toFixed(1)}만</td>
                        <td style={{ padding:"13px 18px", textAlign:"right", fontWeight:700, color:"#8b5cf6" }}>{(r.판매이익/10000).toFixed(1)}만</td>
                        <td style={{ padding:"13px 18px", textAlign:"right", color:"#6b7280" }}>{r.재고량.toLocaleString()}개</td>
                        <td style={{ padding:"13px 18px", textAlign:"right", color: r.리뷰>0?"#f59e0b":"#d1d5db" }}>{r.리뷰>0?r.리뷰+"개":"–"}</td>
                      </tr>
                    ))}
                    <tr style={{ borderTop:"2px solid #e5e7eb", background:"#f8fafc" }}>
                      <td style={{ padding:"13px 18px", fontWeight:700, color:"#374151" }}>평균</td>
                      <td style={{ padding:"13px 18px", textAlign:"right", fontWeight:700 }}>{avgSales}개</td>
                      <td style={{ padding:"13px 18px", textAlign:"right" }}>{(avg("기여이익")/10000).toFixed(1)}만</td>
                      <td style={{ padding:"13px 18px", textAlign:"right", fontWeight:700, color:"#8b5cf6" }}>{(avgProfit/10000).toFixed(1)}만</td>
                      <td colSpan={2} />
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <div style={{ background:"#fff", borderRadius:12, padding:"20px 16px", border:"1px solid #e5e7eb" }}>
              <div style={{ fontSize:13, fontWeight:700, color:"#374151", marginBottom:14 }}>기여이익 vs 판매이익 추이</div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={kpiData}>
                  <XAxis dataKey="week" tick={{ fill:"#9ca3af", fontSize:10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill:"#9ca3af", fontSize:10 }} axisLine={false} tickLine={false} tickFormatter={v=>(v/10000).toFixed(0)+"만"} />
                  <Tooltip content={<Tip />} />
                  <Line dataKey="판매이익" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill:"#8b5cf6", r:4, strokeWidth:0 }} name="판매이익" />
                  <Line dataKey="기여이익" stroke="#10b981" strokeWidth={2} dot={{ fill:"#10b981", r:3, strokeWidth:0 }} name="기여이익" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {tab==="전략" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:16, marginBottom:20 }}>
              <div style={{ background:"#fff", borderRadius:14, padding:"22px", border:"1px solid #fee2e2" }}>
                <div style={{ fontSize:15, fontWeight:700, color:"#dc2626", marginBottom:18 }}>⚠️ 핵심 문제</div>
                {[
                  ["판매량 급변동","주간 58~389개, 평균 209개 — 안정성 부족"],
                  ["목표 대비 20% 수준","월 이익 ~400만원 → 목표의 1/5 수준"],
                  ["리뷰 전환율 낮음","2월3주 리뷰 130개 투입 → 판매 58개 역효과"],
                ].map(([t,d],i,arr) => (
                  <div key={i} style={{ paddingBottom: i<arr.length-1?16:0, marginBottom: i<arr.length-1?16:0, borderBottom: i<arr.length-1?"1px solid #fef2f2":"none" }}>
                    <div style={{ fontWeight:600, fontSize:14, color:"#111827", marginBottom:5 }}>{t}</div>
                    <div style={{ fontSize:13, color:"#6b7280", lineHeight:1.6 }}>{d}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:"#fff", borderRadius:14, padding:"22px", border:"1px solid #d1fae5" }}>
                <div style={{ fontSize:15, fontWeight:700, color:"#059669", marginBottom:18 }}>✅ 즉시 실행 액션</div>
                {[
                  ["쿠팡 광고 집중","상위 노출 → 주 389개 기록 수준 안정 달성"],
                  ["판매가 최적화","할인 축소로 기여이익률 방어"],
                  ["리뷰 전략 재설계","전환율 검증 → 고효율 채널 집중"],
                  ["채널 다각화","스마트스토어·자사몰로 쿠팡 의존도 분산"],
                ].map(([t,d],i,arr) => (
                  <div key={i} style={{ paddingBottom: i<arr.length-1?16:0, marginBottom: i<arr.length-1?16:0, borderBottom: i<arr.length-1?"1px solid #f0fdf4":"none" }}>
                    <div style={{ fontWeight:600, fontSize:14, color:"#111827", marginBottom:5 }}>{t}</div>
                    <div style={{ fontSize:13, color:"#6b7280", lineHeight:1.6 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:"#fff", borderRadius:14, padding: isMobile?"20px 18px":"22px 24px", border:"1px solid #e5e7eb" }}>
              <div style={{ fontSize:15, fontWeight:700, color:"#0f172a", marginBottom:20 }}>🗓️ 월 2,000만 달성 로드맵</div>
              <div style={{ display:"grid", gridTemplateColumns: isMobile?"repeat(2,1fr)":"repeat(4,1fr)", gap:12, marginBottom:20 }}>
                {[
                  { month:"3월",    goal:"500만원",    weekly:"주 300개",   action:"광고 집중·리뷰 재정비",   color:"#f59e0b", bg:"#fffbeb" },
                  { month:"4월",    goal:"800만원",    weekly:"주 470개",   action:"채널 다각화·가격 최적화", color:"#f97316", bg:"#fff7ed" },
                  { month:"5~6월",  goal:"1,200만원",  weekly:"주 700개",   action:"자사몰 오픈·신규채널",   color:"#8b5cf6", bg:"#faf5ff" },
                  { month:"하반기", goal:"2,000만원+", weekly:"주 1,200개", action:"SKU 확장·신제품 출시",   color:"#10b981", bg:"#f0fdf4" },
                ].map((r,i) => (
                  <div key={i} style={{ background:r.bg, borderRadius:12, padding:"16px 14px", borderTop:`3px solid ${r.color}` }}>
                    <div style={{ fontSize:12, fontWeight:700, color:r.color, marginBottom:8 }}>{r.month}</div>
                    <div style={{ fontSize: isMobile?18:20, fontWeight:900, color:"#0f172a", marginBottom:6 }}>{r.goal}</div>
                    <div style={{ fontSize:12, color:"#6b7280", marginBottom:6 }}>{r.weekly}</div>
                    <div style={{ fontSize:11, color:"#9ca3af", lineHeight:1.5 }}>{r.action}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:"#f8fafc", borderRadius:10, padding:"16px 18px" }}>
                <div style={{ fontSize:11, color:"#9ca3af", fontWeight:600, marginBottom:12 }}>성장 경로</div>
                <div style={{ display:"flex", alignItems:"center" }}>
                  {[
                    { label:"현재",  val:`${(monthlyEst/10000).toFixed(0)}만`, color:"#ef4444" },
                    { label:"3월",   val:"500만",   color:"#f59e0b" },
                    { label:"4월",   val:"800만",   color:"#f97316" },
                    { label:"5~6월", val:"1,200만", color:"#8b5cf6" },
                    { label:"연말",  val:"2,000만", color:"#10b981" },
                  ].map((s,i,arr) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", flex: i<arr.length-1?1:"none" }}>
                      <div>
                        <div style={{ fontSize:10, color:"#9ca3af", marginBottom:2 }}>{s.label}</div>
                        <div style={{ fontSize:14, fontWeight:800, color:s.color }}>{s.val}</div>
                      </div>
                      {i<arr.length-1 && (
                        <div style={{ flex:1, height:2, background:`linear-gradient(90deg,${s.color},${arr[i+1].color})`, margin:"0 8px", borderRadius:2, opacity:0.4, marginTop:8 }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
