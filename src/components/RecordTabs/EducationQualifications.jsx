import React from 'react';
import { FileText, Award, GraduationCap } from 'lucide-react';

export default function EducationQualifications({ employee, onViewDocument }) {
  return (
    <div className="space-y-8 font-sans text-slate-900">
      
      <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-2xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
            Educational Qualifications
          </h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-6">
            {employee.educationalQualifications.map((edu) => (
              <div key={edu.slNo} className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-xs font-semibold text-[#1e3a8a] mt-0.5">{edu.institution}</p>
                  </div>
                  <span className="px-3 py-1 rounded bg-blue-50 text-[#1e3a8a] text-xs font-mono font-bold border border-blue-200 self-start sm:self-auto">
                    Year {edu.passingYear}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">SCORE / PERCENTAGE</span>
                    <span className="text-sm font-bold text-slate-900">{edu.percentage}</span>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">DIVISION / CLASS</span>
                    <span className="text-sm font-semibold text-slate-900">{edu.division}</span>
                  </div>
                </div>

                {edu.doc && (
                  <div className="pt-2">
                    <button
                      onClick={() => onViewDocument(edu.doc)}
                      className="px-4 py-2 rounded-md bg-white hover:bg-slate-100 text-[#1e3a8a] font-semibold text-xs inline-flex items-center gap-2 border border-slate-300 transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Degree Certificate ({edu.doc.name})</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-2xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
            Professional Certifications & Awards
          </h2>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-bold text-[#1e3a8a] uppercase tracking-widest border-l-2 border-[#1e3a8a] pl-2.5">
            Certifications & Licenses
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {employee.certifications.map((cert, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{cert.name}</h4>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">{cert.issuingBody}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">YEAR CERTIFIED</span>
                    <span className="text-sm font-mono font-bold text-slate-900">{cert.year}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">VALIDITY</span>
                    <span className="text-sm font-medium text-slate-800">{cert.validity}</span>
                  </div>
                </div>

                {cert.doc && (
                  <button
                    onClick={() => onViewDocument(cert.doc)}
                    className="w-full px-3 py-2 rounded-md bg-white hover:bg-slate-100 text-[#1e3a8a] font-semibold text-xs inline-flex items-center justify-center gap-2 border border-slate-300 transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Certificate Copy</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-slate-200/80">
          <h3 className="text-xs font-bold text-[#1e3a8a] uppercase tracking-widest border-l-2 border-[#1e3a8a] pl-2.5">
            Awards & Commendations
          </h3>

          <div className="space-y-4">
            {employee.awards.map((award, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900">{award.title}</h4>
                  <span className="px-3 py-1 rounded bg-blue-50 text-[#1e3a8a] font-mono font-bold text-xs border border-blue-200">
                    {award.year}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#1e3a8a]">{award.category}</p>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">{award.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
